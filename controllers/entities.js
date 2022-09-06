const entityModel=require('./../model/entitiesModel')
const common = require('../model/common')
const ErrorNames = require('../utils/ErrorNames')
const conn = require('../config/config')
const { data } = require('jquery')
const { constants } = require('fs')
const createEntity=(req,res)=>{
    console.log(req.body)
    entityModel.entities.create(req.body)
    .catch((err)=>{
     console.log(err)
    })
    
     res.send("successfully inserted")
 }

const deleteEntityById = (id)=> {
    return new Promise((resolve, reject)=> {
        entityModel.entities.destroy({where:{id: id}},(err , result) =>{
            if(err) reject(err)
            else resolve(result)
        })
        // .then(()=>{
        //     res.send("successfully deleted")
        // })
        // .catch((err) =>{
        //     console.log(err)
        // })
    })
        
      }

const deleteEntity=(req,res)=>{
    deleteEntityById(req.body.id)
    .then(()=> {
        res.status(200).send("Entity Deleted Successfully")        
    })
    .catch((error)=> {
        if(error.errno == 1451){  // foreign key reference error
            common.getColumnReferences('entities','id', (err, result)=> {
                if(err) return res.status(500).send(err)
                if(result.length == 0){
                    deleteEntityById(req.body.id)
                    .then(()=> res.status(200).send("Entity Deleted Successfully"))
                    .catch((err12)=> res.status(500).send("Something went wrong dasd dd" + err12))
                    return
                }
                let i = 0
                for(const obj of result.values()){
                    common.deleteEntryFromTable(obj.TABLE_NAME, obj.COLUMN_NAME, req.body.id, (err2, result2)=> {
                        if(err2) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err2)
                        i += 1
                        if(i === result.length){
                            deleteEntityById(req.body.id)
                            .then(()=> res.status(200).send("Entity Deleted Successfully"))
                            .catch((err12)=> res.status(500).send("Something went wrong " + err12))       
                        }
                    })
                }
            })
        }
        else
            res.send(error)
    })
} 

const changeStatus=(req,res)=>{
 console.log(req.body)
 entityModel.entities.update({status: req.body.status},{
    where:{id: req.body.id}
})

res.send("successfully status changed")
}         
const getEntityBydata=(req,res)=>{
    entityModel.Table.then((tableObj) => {
        res.send(tableObj)
    })
    .catch((err) => {
        console.log('showAllSchemas ERROR',err);
    })
    
}

const getEntitiesByIds=(id,res)=>{
    entityModel.entities.findAll
    (
    {where:{ id: id}}).then((data) =>{
        console.log(data)
        res.send(data)
    })
    .catch((err) =>{
        console.log(err)
    })
}


const editEntity=(req,res)=>{
    console.log(req.body.id,"edit entity")
    console.log(req.body)
    if(!req.body.id || (!req.body.name && !req.body.description && !req.body.table && !req.body.type)){
        return res.status(400).send("data is missing")  
    }
    else{
        console.log(req.body.id,req.body.table_type)
       let data = {id:req.body.id,name:req.body.name,description:req.body.description,type:req.body.table_type,type:req.body.type}
       console.log(data)
    entityModel.entities.update
    ({name: data.name,
        description: data.description,
        table_type: data.type,
        type: data.type
    },
    {where:{ id: req.body.id}}).then((data) =>{
        console.log(data,"data")
        // res.send("update Successfully")
        
    })
    .catch((err) =>{
        res.send(err)
    })
    res.send("successfully updated")
}
}




module.exports={editEntity,createEntity,deleteEntity,changeStatus,getEntitiesByIds,getEntityBydata}