const { error } = require("jquery");
const stripeSubModel = require("../model/stripeSubModel");
const stripe = require("stripe")(
  "sk_test_51LXJQGSGGPs6zlpy7jKC6CCMb4n45p0XCohaD0nc3zY8hK5NAkIYOfPZkdmMm8DeC7qIJVAnUuFrhB1nuTdPZ9D900uSXBBjFm"
);
const takeawayModel = require("../model/takeawayModel");
const mediaModel = require("../model/mediaModel");

const createPayment = async (req, res) => {
  const { email } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4000,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });
  console.log(paymentIntent);
  res.send({ client_secret: paymentIntent["client_secret"] });
  //   res.json({'client_secret': paymentIntent['client_secret']})
};
const getAllItemById = (id, res) => {
  console.log(id);
  mediaModel.media
    .findAll({ where: { id: id } })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllMappingData = (req, res)=>{
  console.log(req.cookies.id);
  stripeSubModel.media_mapping_user
  .findAll({
    where: { userId: req.cookies.id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: stripeSubModel.users,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        required: false,
      },
    ],
  }).then((userData) => {
    res.json(userData)
  }).catch((err) =>{
    console.log(err);
  })

}

const createSubscription = async (req, res) => {
  console.log("req.cookies.emailId", req.cookies.emailId);
  const { name, payment_method } = req.body;
  console.log(req.body.id);
  takeawayModel.users
    .findAll({ where: { id: req.cookies.id } })
    .then((data) => {
      console.log(data);
      if (data[0].stripe_subscription_Id) {
        console.log("hey buddy subscription_Id is found ");
        stripe.subscriptions
          .update(data[0].stripe_subscription_Id, {
            items: [{ plan: req.body.priceId }],
            expand: ["latest_invoice.payment_intent"],
          })
          .then((updateSubscription) => {
            const status =
              updateSubscription["latest_invoice"]["payment_intent"]["status"];
            const client_secret =
              updateSubscription["latest_invoice"]["payment_intent"][
                "client_secret"
              ];
            stripeSubModel.media_mapping_user
              .create({ userId: data[0].id, mediumId: req.body.id })
              .then((data) => {
                console.log(data);
                stripeSubModel.media_mapping_user
                  .findAll({
                    where: { mediumId: req.body.id },
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    include: [
                      {
                        model: stripeSubModel.media,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        // where: ["takeaway_type_mapping.userId=arrIds"],
                        required: false,
                      },
                    ],
                  })
                  .then((media_mapping_user_data) => {
                    console.log(media_mapping_user_data);

                    res.json({
                      client_secret: client_secret,
                      status: status,
                      media_mapping_user_data: media_mapping_user_data,
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
          .catch((err) => {
            console.log(err);
          });
      } else {
        stripe.customers
          .create({
            payment_method: payment_method,
            email: req.cookies.emailId,
            name: name,
            invoice_settings: {
              default_payment_method: payment_method,
            },
          })
          .then((customer) => {
            stripe.subscriptions
              .create({
                customer: customer.id,
                items: [{ plan: req.body.priceId }],
                expand: ["latest_invoice.payment_intent"],
              })
              .then((subscription) => {
                const status =
                  subscription["latest_invoice"]["payment_intent"]["status"];
                const client_secret =
                  subscription["latest_invoice"]["payment_intent"][
                    "client_secret"
                  ];
                takeawayModel.users
                  .update(
                    {
                      cus_stripe_acc_Id: customer.id,
                      stripe_subscription_Id: subscription.id,
                    },
                    { where: { id: req.cookies.id } }
                  )
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                stripeSubModel.media_mapping_user
                  .create({ userId: req.cookies.id, mediumId: req.body.id })
                  .then((data) => {
                    console.log(data);
                    stripeSubModel.media_mapping_user
                      .findAll({
                        where: { mediumId: req.body.id },
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                          {
                            model: stripeSubModel.media,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                            required: false,
                          },
                        ],
                      })
                      .then((mediaData) => {
                        console.log(mediaData);
                        stripeSubModel.media_mapping_user
                        .findAll({
                          where: { userId: req.cookies.id },
                          attributes: { exclude: ["createdAt", "updatedAt"] },
                          include: [
                            {
                              model: stripeSubModel.users,
                              attributes: { exclude: ["createdAt", "updatedAt"] },
                              required: false,
                            },
                          ],
                        }).then((userData) => {
                          console.log(userData);
                        res.json({
                          client_secret: client_secret,
                          status: status,
                          mediaData: mediaData,
                          userData: userData

                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      })
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
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createPayment, createSubscription, getAllItemById, getAllMappingData };
