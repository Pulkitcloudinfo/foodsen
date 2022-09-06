const ErrorNames = require('../utils/ErrorNames')
const adminSurveyorModel = require('../model/surveyorModel')
const getSurveyorList = async(res)=> {
  await adminSurveyorModel.surveyorUser.findAll().then((data)=>{
    res.send(data)
    }).catch((err)=>{
        console.log("============================>>>>>",err)
    })
    }
const registerSurveyorByAdmin=(req,res)=>{
    console.log(req.body)
  adminSurveyorModel.surveyorUser.findAll({where:{email:req.body.email}}).then((result) =>{
     if(result.length>0){
          console.log("email already exist")
          res.status(400).send("Email already exist")
      }else{
          adminSurveyorModel.surveyorUser.create(req.body)
          .catch((err)=>{
           console.log(err)
          })
          
           res.send("successfully inserted")
       }
  })
}

const deleteSurveyor=async(req,res)=>{
  await adminSurveyorModel.surveyorUser.destroy({where:{id: req.body.id}})
  .catch((err) =>{
      console.log(err)
  })
  res.send("successfully deleted")
}
const changeSurveyorStatus= async(req,res)=>{
    // console.log(req.body)
    await adminSurveyorModel.surveyorUser.update({status: req.body.status},{
        where:{id: req.body.id}
    })
   
    res.send("successfully status changed")
}         
const getSurveyorById=async(id,res)=>{
    // console.log(id)
    await adminSurveyorModel.surveyorUser.findAll({where:{id: id}}).then((data) =>{
        res.send(data)
}).catch((err)=>{
    console.log(err)
    })
  
}
const editSurveyor=(req,res)=>{
    console.log(req.body)
     adminSurveyorModel.surveyorUser.update
    ({name: req.body.data.name,
     email: req.body.data.email,
     password: req.body.data.password
    },
    {where:{id: req.body.data[0].id}})
    .catch((err) =>{
        console.log(err)
    })
    res.send("successfully updated")
}


module.exports = {editSurveyor,getSurveyorById,registerSurveyorByAdmin,deleteSurveyor, getSurveyorList,changeSurveyorStatus}