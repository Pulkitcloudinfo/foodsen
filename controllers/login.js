
const adminTakeawayModel = require("../model/takeawayModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const user = await adminTakeawayModel.users.findAll({
    where: {
      email: req.body.email,
    },
  });

  const userId = user[0].id;
  const name = user[0].name;
  const email = user[0].email;
  const accessToken = jwt.sign(
    { userId, name, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );
  const refreshToken = jwt.sign(
    { userId, name, email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  const role = user[0].role;
  console.log(role);
  const id = user[0].id
  const emailId = user[0].email;
  // const email = user[0].email
  // res.cookie("refreshToken", refreshToken)
  await adminTakeawayModel.users.update(
    { refresh_token: refreshToken },
    {
      where: {
        id: userId,
      },
    }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("role", role, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("id", id, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.cookie("emailId", emailId, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.json({ accessToken, user });

};

const getRecordTypesOfTakeaway = (takeawayId, res) => {
  adminTakeawayModel.record_type_takeaway_mapping
    .findAll({
      where: {
        userId: takeawayId,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: adminTakeawayModel.recordType,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          model: adminTakeawayModel.users,
          attributes: {
            exclude: [
              "name",
              "password",
              "refresh_token",
              "status",
              "profile_setup",
              "owner",
              "role",
              "staff",
              "createdAt",
              "updatedAt",
            ],
          },
          required: false,
        },
      ],
    })
    .then((data) => {
      res.send(data);
      if (data.length > 0) {
        let response = getCountOfRecord(result, takeawayId);
        try {
          res.status(200).send(response);
        } catch (e) {
          res.status(200).send(result);
        }
      } else {
        console.log("No record");
        res.status(400);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCountOfRecord = (data, id) => {
  console.log("from getCountOfRecord function1", id);
  console.log("from getCountOfRecord function", data);
  return new Promise((resolve, reject) => {
    for (let x in data) {
      adminTakeawayModel.getCountPerRecordInsertedByTakeaway.findAll({
        where: {
          userId: id,
        },
      });
      console
        .log("from getCountOfRecord function", id)
        .then((result) => {
          data[x].count = result.length;
          if (x == data.length - 1) {
            // console.log(data)
            resolve(data);
          }
        })
        .catch((e) => {
          data[x].count = 0;
        });
    }
  });
};
const getDataFromRecordTableForTakeaway = (table_name, user_Id, res) => {
  adminTakeawayModel.getDataFromRecordTableForTakeaway(
    table_name,
    user_Id,
    (err, result) => {
      if (err) {
        console.log(err);
        // return res.status(500).send("Record Type created but " + err)
      }
      console.log(result);
      return res.status(201).send("Created Successfully");
    }
  );
};

const z = (req, res) => {
  let user_Id = req.query.userId;
  let record_id = req.query.recordId;
  console.log(user_Id, record_id, "=====================");
  adminTakeawayModel.record_type_takeaway_mapping
    .findAll({
      where: {
        recordTypeId: record_id,
        userId: user_Id,
      },
    })
    .then((result) => {
      console.log("=======++", result);
      if (result && result.length > 0) {
        adminTakeawayModel.recordType
          .findAll({ where: { id: record_id } })
          .then((data) => {
            console.log(data, "result1---->>>>");
            //adminTakeawayModel.getDataFromRecordTableForTakeaway(result1[0].tablename,user_Id ,(err, result2) =>{
            // .then(async(result2)=>{
            let table_name = data[0].tablename;
            getDataFromRecordTableForTakeaway(
              table_name,
              user_Id,
              res,
              (err, result2) => {
                console.log(result2, "res");
                console.log(res, "from login file , line number 133");
                if (err) {
                  console.log("ohh no error");
                } else if (result2 && result2.length > 0) {
                  // res.status(200).send(result2)
                  console.log(result2, "from login file , line number 139");
                  let keys = Object.keys(result2[0]);
                  let columnNames = getAllcolumnNameInATable(keys, result2);
                  try {
                    //  console.log(columnNames)
                    let mainResponse = {
                      column: columnNames,
                      data: result2,
                    };
                    //  console.log(mainResponse)
                    res.status(200).send(mainResponse);
                    console.log("icvsdjbsdjv");
                  } catch {
                    res.status(500).send("Something went wrong");
                  }
                } else {
                  res.status(404).send("No data");
                }
              }
            );
          })
          .catch((e1) => {
            console.log(e1);
            res.status(500).send("Something went wrong");
          });
      }
      console.log("no data found");
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Something went Wrong");
    });
};
const getAllcolumnNameInATable = async (data) => {
  return new Promise((resolve, reject) => {
    let names = [];
    for (let x in data) {
      let id = data[x].substring(3);

      entitiesModel
        .getEntitiesById(id)
        .then((result) => {
          // console.log("-------------------------",result)
          if (result[0]) {
            names.push({
              name: result[0].name,
              type: result[0].type,
              nametogetData: data[x],
            });
          } else {
            names.push({
              name: data[x],
              type: 2,
              nametogetData: data[x],
            });
          }
          if (names.length === data.length) {
            // console.log(names)
            resolve(names);
          }
        })
        .catch((e) => {
          console.log(e);
          names.push(data[x]);
        });
    }
  });
};

module.exports = {
  login,
  getRecordTypesOfTakeaway,

  getAllcolumnNameInATable,
};
