const recordTableModel=require('../model/recordTableModel')
const entitiesModel=require('../model/entitiesModel')
const adminProductModel = require('../model/productModel')
const ErrorNames = require('../utils/ErrorNames')
const common=require('../model/common')
const sequelize = require('sequelize')
const { QueryInterface } = require('sequelize')
const conn = require('../config/config')
// const { response } = require('express')

const getAllRecordTypes = (res)=> {
    recordTableModel.records.findAll().then((data)=>{
        res.send(data)
        }).catch((err)=>{
            console.log(err)
        })
        }

const getFieldNameFromRecordTable = (name,res) =>{ 
    recordTableModel.getFieldNameFromRecordTable.findAll(name,(err,result) =>{
        if(err){
            console.log(err)
            res.status(500).send("Something Went wrong")
        }else{
           res.status(200).send(result)

        }
    })
}
const getAllTableName = (table_type,res) =>{ 
    recordTableModel.getAllTableName(table_type,(err,result) =>{
        if(err){
            console.log(err)
            res.status(500).send("Something Went wrong")
        }else{
           res.status(200).send(result)
        }
    })
}
const getTableNameFromEntity = (name,res) =>{
    recordTableModel.entities.findOne({attributes: ['table_type']},{where: {name: 'name'}},(err,result) =>{
        if(err){
            console.log(err)
            res.status(500).send("Something Went wrong")
        }else{
           res.status(200).send(result)
        }
    })
}
const createRecordTable = (table_name, entityNames, res)=> {
    recordTableModel.createRecordTable(table_name, entityNames, (err, result)=> {
        
        if(err) {
            console.log(err)
            // return res.status(500).send("Record Type created but " + err)
        } 
        console.log(result)
        return res.status(201).send("Created Successfully")
    })
}

const createRecordType= (req,res)=>{
    let displayName=req.name
    let table_name=(displayName).trim()
    table_name=table_name.split(' ').join('_')
    console.log(displayName,"displayName")
    recordTableModel.records.findAll({attributes: ['id'], where:{tablename: displayName}}).then((result)=>{
        console.log(result,"result")
         if(result.length>0){
            console.log(result,"result")
            res.status(400).send("Name already Exist")
        }else{
             recordTableModel.records.create({name: displayName, tablename: table_name}).then((result)=>{
                console.log(result)
                if(result){
                    const recordTypeId = result.id
                    
                    if(req.entityIds && Array.isArray(req.entityIds) && req.entityIds.length > 0){
                            try{
                                console.log("enter into try block")
                                
                            // recordTableModel.record_type_entity_mapping.create({entityId,recordTypeId},(queryStr)).then((data) =>{
                                recordTableModel.insertEntitiesMap(table_name,recordTypeId, req.entityIds, (err, result)=> {
                                    if (err) return res.status(500).send("Record Type created but " + err)    
                            console.log(result)
                            console.log(table_name,"hy-------")
                            if (result){
                            createRecordTable(table_name, entityId, res)
                            console.log("-------------------------------??????????>>>>>>>>>>>>>>>>//////")
                            }else{
                                console.log(err)
                            }
                        })
                    }catch(err){
                        console.log("hi i am from catch ")
                        console.log(err)
                    }

                    }else{
                        createRecordTable(table_name, [], res)
                        console.log("else")
                    }
                    
                }
                else{
                    console.log(err)
                    res.status(500).send("Something went wrong")
                }
               
            })
        }
        
    })
    console.log("hey")
}

const deleteRecordTable=(req,res)=>{
    recordTableModel.records.destroy({where:{id:req.body.tableId}},(err,result)=>{
        console.log("data")
        if(err) res.status(500).send("something went wrong",err) 
        else if(result.length>0){
            let tableNameForDelete=result[0].tablename
            recordTableModel.records.destroy({where:{id:req.body.tableId}},(err,result)=>{
                if(err){
                    if(err.errno==1451){
                        common.getColumnReferences('record_type','id', (err2, result2)=> {
                        if(err2) res.status(500).send("something went wrong",err) 
                        else{
                            let i=0
                            for(let x of result2){
                                common.deleteEntryFromTable(x.TABLE_NAME,x.COLUMN_NAME,req.body.tableId,(err3,result3)=>{
                                if(err3) res.status(500).send("something went wrong",err) 
                                   i+=1
                                   if(i==result2.length){
                                       common.deleteEntryFromTable('record_type',"id",req.body.id,(err4,result4)=>{
                                           if(err4) res.status(500).send("Error",err4) 
                                           recordTableModel.deleteRecordTableByName(tableNameForDelete,(err5,result5)=>{
                                               if(err5)res.status(500).send("Error"+err5) 
                                               else{
                                                recordTableModel.Users.destroy({where:{id:req.body.tableId}},(err7,result)=>{
                                                    if(err7) res.status(500).send("Error",err4)
                                                    else{
                                                        res.status(200).send("Success")
                                                    }
                                                })
                                               }
                                           })
                                       })
                                   }
                                })
                            }
                        }  
                        
                        })
                    }else{
                        console.log("test7")
                        res.status(500).send("something went wrong",err)
                    }
                    
                }
                else{
                    // res.status(200).send("Record Table Deleted Successfully")
                    console.log("test8")
                    recordTableModel.deleteRecordTableByName(tableNameForDelete,(err,result)=>{
                        if(err){
                            console.log("test9")
                            console.log(err)
                            res.status(500).send("something went wrong")
                        }else{
                            console.log("test10")
                            res.status(200).send("Deleted Successfully")

                        }
                    })
                }
            })           

        }else{
            res.status(404).send("No Record Found")
        }

    })
}

const addEntityToTable=(req,res)=>{
    let table_name=req.tableName
    let ids=req.entityIds
    
    if(ids.length>0 && table_name){
        recordTableModel.record_type_entity_mapping.findAll({where:{recordId:req.query.recordTypeId},
            attributes:{exclude: [,'createdAt', 'updatedAt']},
            include: [{model:recordTableModel.entities,
            required:false
        }]
    })
        .then(storedEntityIdsObj => {
            let ind
            console.log(storedEntityIdsObj,ids)
            for (const obj of Object.values(storedEntityIdsObj)){
                ind = ids.findIndex((item)=> item == obj.entity_id)
                if(ind > -1)
                    ids.splice(ind, 1)
            }
            recordTableModel.insertEntitiesMap.create(req.recordTypeId, ids).then((result) =>{ 
                console.log(result,"result")
                if(result) return res.status(200).send("successfully insert entities")
    
                let idStr=''
                for(let x of ids){
                    idStr+=x+","
                }
                idStr=idStr.slice(0, -1)
                console.log(idStr,"idstr")
                entitiesModel.entities.findAll({where:{id:idStr}}).then((result)=>{
                    if(result){
                        let columnsStr=''
                        for(let x of result){
                            columnsStr+="ADD "+x.name+" VARCHAR(20),"
                        }
                    }
                        columnsStr=columnsStr.slice(0,-1)
                        // res.send(columnsStr)
                        // console.log(columnsStr)
                        entitiesModel.addColumnToRecordTable(table_name,columnsStr,(err,result)=>{
                            if(err)
                            {
                                console.log(err)
                            }else{
                                res.status(201).send("Columns Added Successfully")
                            }
                })
            })
        })
        .catch(err=> res.status(500).send(ErrorNames.somethingWentWrong + " " + err))
    })
}
    else{
        res.status(400).send("Provide Columns or Table name") 
    }
}



const getRecordTableById=(req,res)=>{
// console.log(req.query.id)
recordTableModel.records.findAll({where:{id:req.query.id}}).then((result) =>{
       if(result.length<1){
        res.status(404).send('No record Found')
    }
    else{
        recordTableModel.record_type_entity_mapping.findAll({where:{id:req.query.id},
            attributes:{exclude: ['createdAt', 'updatedAt']},
            include: [{model:recordTableModel.entities,
            required:false
        }]
        
    })
        .then((response)=>{
            console.log(response,"hy")
            let entitiesIds=[]
            for(let x in response){
                console.log(response[x].entity_id)
                entitiesIds.push(response[x].entity_id)
            }
            result[0].entityIds=entitiesIds
             res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send("Something went wrong")
        })
    }
})
}

const changeRecordTypeStatus=(req,res)=>{
    recordTableModel.records.update({status:req.body.status},{ 
        where:
        {
            id:req.body.id
        }
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
    console.log(req.body)
}

const getAllTakeawayTypes=(req,res)=>{
    recordTableModel.takeaway_types.findAll().then((data) =>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getAllMenuItems=(req,res)=>{
    recordTableModel.menu_itemsUsersData.findAll({
        include: [{ 
            model: recordTableModel.takeaway_types, 
            attributes:{exclude: ['createdAt', 'updatedAt']},
        required:false
    }]
      }).then((data)=>{
        console.log(data)
        res.send(data)
      })
        .catch((err)=>{
            console.log(err)
      })
}
const changeMenuItemStatus=(req,res)=>{
    recordTableModel.menu_itemsUsersData.update({
        status:req.body.status
    },{
            where:{id:req.body.id}
        })
        res.send("successfully status changed")
}                             

const getMenuItemsById=(id,res)=>{
    console.log(id,"hy buddy")
    recordTableModel.menu_itemsUsersData.findAll({where:{id:id},
         attributes:{include:['id']},
        include: [{model:recordTableModel.takeaway_types, attributes:{exclude: ['createdAt', 'updatedAt']},
        required:false
    }]
      }).then((data)=>{
        res.send(data)
      })
        .catch((err)=>{
            console.log(err)
      })
}

const createMenuItems=(req,res)=>{
    recordTableModel.menu_itemsUsersData.create({name:req.body.name,takeawayTypeId :req.body.type})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

const updateMenuItems=(req,res)=>{
    console.log(req.body,"body")
    recordTableModel.menu_itemsUsersData.update({name:req.body.data.name,takeaway_type_id:req.body.data.takeaway_type_id},
        {where:{id:req.body.id}
    }).catch((err) =>{
        console.log(err)
    })
    res.send("successfully updated")
}

const deleteMenuItemById=(req,res)=>{
    console.log(req.body)
    recordTableModel.menu_itemsUsersData.destroy({where:{id:req.body.id}})
    .then((data)=>{
        res.data
    }).catch((err)=>{
        console.log(err)
    })
       
}

const updateRecordtype=(req,res)=>{
    console.log(req.body,"1")
    let addFlag=false
    let removeFlag=false
    let tableName=req.body.table_name
    let tableId=req.body.id
    let ids=req.body.entities
    console.log(ids,"ids")
    console.log(tableId,"id")
    let entitiesAlredyPresentInTable=[]
    let entitiesToAddInTable=[]
    let entitiesToRemoveFromTable=[]
    recordTableModel.record_type_entity_mapping.findAll({where:{recordId: req.body.id},attributes:['entityId']})
    .then((response)=>{
            for(let x in response){
                entitiesAlredyPresentInTable.push(response[x].entityId)
            }
            for(let x in ids){
                let index=entitiesAlredyPresentInTable.indexOf(ids[x])
                if(index>-1){
                    entitiesAlredyPresentInTable.splice(index,1)
                }else{
                    entitiesToAddInTable.push(ids[x])
                }
            }
            entitiesToRemoveFromTable=entitiesAlredyPresentInTable
            console.log(entitiesToAddInTable,"dfjh")
            console.log("for add"+entitiesToAddInTable)
            let strId=''
            if(entitiesToRemoveFromTable.length>0){
                for (let x of entitiesToRemoveFromTable){
                    strId+=x+','
                }
                strId=strId.slice(0,-1)
            }
            
            console.log("hi",strId)
            console.log("hyy",tableId)
            console.log("hi")
            recordTableModel.record_type_entity_mapping.destroy({where:{entityId:ids,recordTypeId: tableId}})
            .then((response1)=>{
                console.log(response1,"deleted")
                let multipleIdstr=''
                if(entitiesToAddInTable.length>0){
                    for(let x of entitiesToAddInTable){
                        multipleIdstr+=`(${x},${tableId}),`
                    }

                    multipleIdstr=multipleIdstr.slice(0,-1)
                }
                console.log(multipleIdstr)
                console.log("for add"+entitiesToAddInTable)
                if(entitiesToAddInTable.length>0)
                {
                recordTableModel.record_type_entity_mapping.create({entityId:ids,recordId:tableId})
            // recordTableModel.addEntityToMapTable(multipleIdstr,entitiesToAddInTable)
            .then((data)=>{
                    console.log("=======>>>>????",data)
                    if(entitiesToAddInTable.length>0){
                        let entitiesNameForCreateColumn=[]
                        for(let x of entitiesToAddInTable){
                            entitiesNameForCreateColumn.push("ADD col"+x+" VARCHAR(50)")
                        }
                        console.log("addcolumntorecord")
                        console.log(tableName,"---->>//")
                        console.log(entitiesNameForCreateColumn,"---->>//")
                    //  QueryInterface.sequelize
                    recordTableModel.addColumnToRecordTables(entitiesNameForCreateColumn,tableName)
                    .then((response5)=>{
                        console.log("success")
                        addFlag=true
                        res.status(200).send("Success")
                    }).catch((err5)=>{
                        console.log(err5)
                    })
                }
                    else{
                        console.log("Nothing to Add")
                        res.status(200).send("NOTHING TO ADD")
                    }
                })
                .catch((err4)=>{
                    console.log("Outside from then")
                    console.log(err4)
                })
            }else{
                console.log(err)
            }
            })
            .catch((e)=>{
                console.log("error in delete map entity"+e)
            }) 
       
    })
    .catch((err)=>{
        console.log(err)
    })
}



const getTableByIdForRecordCreation=(id,res)=>{
recordTableModel.records.findAll ({where:{id:id}}).then((result)=>{
     if(result.length<1){
        res.status(404).send('No record Found')
    }
    else{
        recordTableModel.record_type_entity_mapping.findAll({where:{recordId:id},
            attributes:{exclude: ['recordId','createdAt', 'updatedAt']},
            include: [{model:recordTableModel.entities,
            required:false
        }]
    })
        .then((response)=>{
            console.log(response,"response====??")
            let entitiesIds=[]
            for(let x in response){
                console.log(response[x].entityId)
                entitiesIds.push({id:response[x].entityId,name:response[x].entity.name,type:response[x].entity.type})
            }
            console.log(result[0],"result[0]")
            result[0].entityIds=entitiesIds
            console.log(result,"dsfkjhsj")
            result.push(result[0].entityIds)
             res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send("Something went wrong")
        })
    }
})
}


const createRecord=(req,res)=>{
    let tableName=req.body.tableName
    let data=req.body.dataforInsert
    console.log(req.body.dataforInsert,req.body.tableName,"data")
    let columnStr=''
    let valueStr=''
    for(let x of data){
        columnStr+=x.columnName+","
        valueStr+=" '"+x.columnValue+"',"
    }
    columnStr = columnStr.slice(0, -1)
    valueStr = valueStr.slice(0, -1)
    // console.log(columnStr,valueStr)
    recordTableModel.insertDataIntoRecordTable(tableName,columnStr,valueStr)
    .then((response)=>{
        res.status(200).send("Success")

    }).catch((e)=>{
        res.status(200).send(e)
        
    })

}

const getAllDataInsideAReacordTable=async(req,res)=>{
    let tableName=''
    recordTableModel.records.findAll({where:{id:req.query.id}}).then((result) =>{
        console.log(result,"result")
        if(result) 
        {
            tableName=result[0].tablename
                    conn.query(`select * from re_${tableName}`).then(async(response) =>{
                console.log(response)
                if(response.length>0){

                    let keys=Object.keys(...response[0])
                    console.log(keys)
                    let columnNames= await getAllcolumnNameInATable(keys)
                    try{
                        
                         let mainResponse={
                             "column":columnNames,
                             "data":response
                         }
                         res.status(200).send(mainResponse)
                    }
                    catch{

                    }

                }else{
                    res.status(404).send(response)

                }
                
                
            })
        
        }else{
            console.log(err)
        }
    })
}

const getAllcolumnNameInATable=async(data)=>{
    return new Promise((resolve,reject)=>{

        let names=[]
        console.log(data)
        for(let x in data){
            let id=data[x].substring(3)
            entitiesModel.entities.findAll({
                attributes: [
                    "name",
                    "type",
                ],
                where:{id:id}
            }).then((result)=>{
                console.log(result)
                if(result[0]){
                    names.push({
                        "name":result[0].name,
                        "type":result[0].type,
                        "nametogetData":data[x]
                    })
                }else{
                    names.push({
                        "name":data[x],
                        "type":2,
                        "nametogetData":data[x]
                    })
                }
                if(names.length===data.length){
                    console.log(names,"name")
                    resolve(names)
                }
            })
            .catch((e)=>{
                console.log(e)
                names.push(data[x])
            })
            
        }
    })
}


const getAllDataInsideAReacordTable1=()=>{
    let tableName=''
    console.log(tableName,"pdkfo-------------")
    // let id = req.query.id
    recordTableModel.records.findAll({where:{id: req.query.id}}).then((result) =>{
        // if(err) res.status(500).send("Something went wrong")
        if(result){
            tableName=result[0].tablename
             recordTableModel.getAllDataInsideAReacordTable(tableName,)
            .then(async(response)=>{
                console.log(response)
                if(response.length>0){

                    let keys=Object.keys(response[0])
                    // console.log(keys)
                    let columnNames= await getAllcolumnNameInATable(keys)
                    try{
                        //  console.log(columnNames)
                         let mainResponse={
                             "column":columnNames,
                             "data":response
                         }
                        //  console.log(mainResponse)
                         res.status(200).send(mainResponse)
                    }
                    catch{

                    }

                }else{
                    res.status(404).send(response)

                }
                
                
            })
            .catch((e)=>{
                console.log(e)
                res.status(500).send(e)
            })
        }else{
            console.log("err")
        }
    })
}







module.exports={createRecord,getAllDataInsideAReacordTable1,getAllTableName,getTableNameFromEntity,updateRecordtype,getTableByIdForRecordCreation,deleteMenuItemById,updateMenuItems,getMenuItemsById,createMenuItems,changeMenuItemStatus,getAllMenuItems,getAllTakeawayTypes,createRecordType,deleteRecordTable,addEntityToTable, getAllRecordTypes,changeRecordTypeStatus,getRecordTableById,getAllDataInsideAReacordTable,getFieldNameFromRecordTable}