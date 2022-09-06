const { error } = require("console");
const { log } = require("util");
const mediaModel = require("../model/mediaModel");
const ffmpeg = require("fluent-ffmpeg");

const stripe = require("stripe")(
  "sk_test_51LXJQGSGGPs6zlpy7jKC6CCMb4n45p0XCohaD0nc3zY8hK5NAkIYOfPZkdmMm8DeC7qIJVAnUuFrhB1nuTdPZ9D900uSXBBjFm"
);

const getAllMedia = async (req, res) => {
  try {
    const media = await mediaModel.media.findAll();
    res.json(media);
  } catch (err) {
    console.log(err);
    res.status(400).json(error);
  }
};

const createThumbnail = async (req, res) => {
  let filePath = "";
  let fileDuration = "";
  console.log("Url   print ===== >> ", req.body);

  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.log(metadata); // all metadata
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
    //   fileDuration ='14.59 s'
  });

  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function (filenames) {
      console.log("Screenshots taken");
      console.log(filenames);
      console.log("req.body.url", req.body.url);
      console.log("req.file.fileName", req.body.fileName);

      stripe.products
        .create({
          name: req.body.name,
        })
        .then((productWithoutPriceList) => {
          stripe.prices
            .create({
              unit_amount: req.body.cost,
              currency: "inr",
              recurring: { interval: "month" },
              product: productWithoutPriceList.id,
            })
            .then((price) => {
              console.log(price);
              stripe.products
                .update(productWithoutPriceList.id, {
                  metadata: { price_id: price.id },
                })
                .then((productWithPriceList) => {
                  console.log(productWithPriceList, "productWithoutPriceList");

                  if (productWithPriceList) {
                    console.log(
                      "productWithPriceList.metadata.price_id",
                      productWithPriceList.metadata.price_id
                    );
                    console.log(req.body.date);
                    mediaModel.media
                      .create({
                        name: req.body.name,
                        videos: req.body.url,
                        thumbnail: filePath,
                        product_Id: productWithPriceList.id,
                        status: productWithPriceList.active,
                        price_Id: productWithPriceList.metadata.price_id,
                        price: req.body.cost,
                        expiry_date: req.body.date,
                      })
                      .then((data) => {
                        return res.json({
                          success: true,
                          url: filePath,
                          fileName: filenames,
                          fileDuration: fileDuration,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    console.log(
                      "product_Id not found please first check your media controller"
                    );
                    console.log(err);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })

    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screenshots at 20%, 40%, 60% and 80% of the video
      count: 7,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.jpg",
    });
};

module.exports = { getAllMedia, createThumbnail };
