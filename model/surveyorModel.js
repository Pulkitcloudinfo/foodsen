// const conn = require("../../db/config")

// const getSurveyorList = (next) => {
//   conn.query("select id, name, email, status from surveyor order by modified_at DESC",next)
// }
// const getSurveyorById=(id,next)=>{
//   conn.query(`select id, name, email, status,password from surveyor where id= '${id}'`,next)

// }
// const createSurveyorByAdmin=(data,next)=>{
//   // console.log(data)
//   conn.query(`INSERT INTO surveyor (name, email, password)VALUES ('${data.name}', '${data.email}', '${data.password}')`,next)
// } 
// const getAllSurveyorByEmail=(email,next)=>{
//   conn.query(`select * from surveyor where email='${email}'`,next)
// }

// const deleteSurveyorById=(id,next)=>{
//   conn.query(`delete from surveyor where id=${id}`,next)
// }
// const changeSurveyorStatus=(id,status,next)=>{
//   conn.query(`UPDATE surveyor  SET status =${status} WHERE id=${id} ;`,next)
// }
// const editSurveyor=(id,data,next)=>{
//   conn.query(`UPDATE surveyor  SET name='${data.name}',email='${data.email}',password='${data.password}' WHERE id=${id} ;`,next)

// }

// module.exports = {
//   createSurveyorByAdmin,
//   editSurveyor,
//   getAllSurveyorByEmail,
//   deleteSurveyorById,
//   getSurveyorList,
//   changeSurveyorStatus,
//   getSurveyorById
// }
const conn = require('../config/config')
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

const surveyorUser = conn.define('surveyor',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },
    status:{
      type: DataTypes.INTEGER
  }
},

{
    freezeTableName:true
});
 
(async () => {
    await conn.sync();
})();


module.exports={surveyorUser}