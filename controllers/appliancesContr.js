const appliancesModel=require('../model/appliancesModel')

const getAllAppliances=(req,res)=>{
    appliancesModel.kitchen_appliances.findAll().then((data)=>{
        res.send(data)
        }).catch((err)=>{
            console.log(err)
        })
        }

const createAppliances=(req,res)=>{
    appliancesModel.kitchen_appliances.create(req.body)
    .catch((err)=>{
     console.log(err)
    })
    
     res.send("successfully inserted")
 }

const changeAppliancesStatus=(req,res)=>{
    console.log(req.body) 
    appliancesModel.kitchen_appliances.update({status: req.body.status},{
        where:{id: req.body.id}
    })
   
    res.send("successfully status changed")
}         
const deleteAppliancesById=(req,res)=>{
    console.log(req.body)
    appliancesModel.kitchen_appliances.destroy({where:{id: req.body.id}})
    .catch((err) =>{
        console.log(err)
    })
    res.send("successfully deleted")
  }
const getAppliancesById=(req,res)=>{
    console.log(req.query.id)

    appliancesModel.kitchen_appliances.findAll({where:{id: req.query.id}}).then((data) =>{
        res.send(data)
}).catch((err)=>{
    console.log(err)
    })
  
}
const updateAppliancesById=(req,res)=>{
    appliancesModel.kitchen_appliances.update
    ({name: req.body.data.name,
        category: req.body.data.category,
        scale: req.body.data.scale,
        min	: req.body.data.min	,
        max: req.body.data.max,
        description: req.body.data.description,
        status: req.body.data.status,
    },
    {
        where:{ 
            id: req.body.id
        }
    })
    .catch((err) =>{
        console.log(err)
    })
    res.send("successfully updated")
}

module.exports={
    getAllAppliances,
    createAppliances,
    changeAppliancesStatus,
    deleteAppliancesById,
    getAppliancesById,
    updateAppliancesById
    
}