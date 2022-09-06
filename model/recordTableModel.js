const conn = require('../config/config')
const Sequelize = require('sequelize');
const { takeaway_type, users } = require('./takeawayModel');
const { next } = require('cli');
const sequelize = require('sequelize');
const QueryTypes = require('sequelize')
const entitiesModel = require('../model/entitiesModel')

const { DataTypes } = Sequelize;

const records = conn.define('records',{
    name:{
        type: DataTypes.STRING
    },
    tablename:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
},

{
    freezeTableName:true
});
 


const takeaway_types = conn.define('takeaway_types',{
    name:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
},

{
    freezeTableName:true
});

const menu_itemsUsersData = conn.define('menu_items',{
    name:{
        type: DataTypes.STRING,
    },
    // takeaway_type_id:{
    //     type: DataTypes.INTEGER
    // },
    status:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },
},
{
    freezeTableName:true,
});
// menu_itemsUsersData.hasOne(takeaway_type)
// takeaway_types.belongsTo(menu_itemsUsersData)
takeaway_types.hasOne(menu_itemsUsersData)
menu_itemsUsersData.belongsTo(takeaway_types)


const entities = conn.define('entities',{
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    type:{
        type: DataTypes.INTEGER
    },
    table_type:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
},

{
    freezeTableName:true
});

const record_type_entity_mapping = conn.define('entity_mapping_records',{
    // entityId:{
    //     type: DataTypes.INTEGER,
    // //     // references: {
    // //     // model:entities,
    // //     // key: 'id'
    // //     // },
    // //     // onDelete: 'cascade',
    // //     // onUpdate: 'cascade'
    // },
    // recordTypeId :{
    //     type: DataTypes.INTEGER,
    // //     // references: {
    // //     // model:record_type,
    // //     // key: 'id',
    // //     // },
    // //     // onDelete: 'cascade',
    // //     // onUpdate: 'cascade' 
    // },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
},

{
    freezeTableName:true
});

entities.hasOne(record_type_entity_mapping,{targetKey:'entityId'})
record_type_entity_mapping.belongsTo(entities,{sourceKey:'entityId'})


records.hasOne(record_type_entity_mapping)
record_type_entity_mapping.belongsTo(records)

const getRecordTableByName = (tableName, next) => {
    conn.query(`select id from records where tablename = '${tableName}'`, next)
}
const createRecordType=(displayName,table_name,next)=>{
    conn.query(`Insert Into records (name,tablename) Values('${displayName}','${table_name}')`,next)
}


const insertEntitiesMap = (tablename,recordTypeId, entityIds,next)=> {
    let queryStr = `INSERT INTO entity_mapping_records (entityId ,recordId) value `
    for(const id of entityIds.values()){
        queryStr += `('${id}', '${recordTypeId}'),`
    }
    queryStr = queryStr.slice(0, -1)
    conn.query(queryStr,{type:Sequelize.QueryTypes.INSERT},next).then((data) =>{
        console.log(data)
        if(data){
            createRecordTable(tablename,entityIds)
            console.log("success")

        }else{
            console.log("error")
        }
    })
}


const getFieldNameFromRecordTable = (name)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`${name}`,{
            type: Sequelize.QueryTypes.SELECT
        }).then((data) =>{
            if(data){
                resolve(data)
            }else{
                reject(err)
            }
        })
})
}

const getTableNameFromEntity = (name,next) =>{
    conn.query(`select table_type from entities where name='${name}'`,next)
}

const createRecordTable= (tableName, entities, next) => {
    
    let queryStr = `create table re_${tableName} (
        id int NOT NULL AUTO_INCREMENT,
        userId int DEFAULT NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`
    console.log(entities,"kesjterjhn iu u iouiouj ")
    for (const entity of entities.values()){
        queryStr += ` col${entity}   varchar(20),` 
    }
    console.log(queryStr,"setpi9")
    queryStr += "PRIMARY KEY (`id`) )"
    conn.query(queryStr, {type:Sequelize.QueryTypes.INSERT},next).then((data)=>{
        console.log(data,"kseouiruvrntumv99r")
    }).catch((err) =>{
        console.log(err)
    })
}


const getAllTableName = (table_type) =>{
    conn.query(`select name from ${table_type}`,{type:QueryTypes.SELECT})
 }

 const insertDataIntoRecordTable=(tableName,columnStr,valueStr)=>{
    return new Promise((resolve,reject)=>{
        let mainStr=`insert into re_${tableName} (${columnStr}) value(${valueStr})`
        // console.log(mainStr)
        conn.query(mainStr,{type:Sequelize.QueryTypes.INSERT}).then((result) =>{
            if(result) resolve(result)
            else{
                reject(err)
            }
        })
    })
}

const addColumnToRecordTables=(entitiesNames,tableName)=>{
    let columnsStr=''
    return new Promise((resolve,reject)=>{
        for(let x of entitiesNames){
            columnsStr+=x+','
        }
        columnsStr=columnsStr.slice(0,-1)
        console.log(columnsStr,">>>>>>>>>>>>>")
        let sql = (`ALTER table ${tableName}  ${columnsStr}`)
        conn.query(sql,{type:Sequelize.QueryTypes.INSERT},(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}


const deleteRecordTableByName=(table_name)=>{
     let sql = (`DROP TABLE ${table_name};`)
     conn.query(sql,{type:Sequelize.QueryTypes.DELETE})
    }

    const addColumnToRecordTable=(tablename,columnsStr)=>{
        let sql = (`ALTER TABLE ${tablename} ${columnsStr}`)
        conn.query(sql,{type:Sequelize.QueryTypes.INSERT})

      }


    const addEntityToMapTable=(entityId,entitiesToAddInTable)=>{
        console.log(entityId,entitiesToAddInTable)
        return new Promise((resolve,reject)=>{
            if(entitiesToAddInTable.length>0){
                conn.query(`insert into record_type_entity_mapping (entityId,recordTypeId) value ${entityId}`,(err,result)=>{
                    if(err) reject(err)
                    else{
                        resolve(result)
                    }
                })
            } 
            else{
                resolve("Nothing to Add")
            }
            })
    }
    const getAllDataInsideAReacordTable=(tableName)=>{
        
            conn.query(`select * from ${tableName}`).then(async(result) =>{
                console.log(result[0],"->>>>>>>>")
                if(result&&result.length>0){
                    // object = Object.assign({},...result);
    
                    // console.log(object);
                    let keys = Object.keys(...result[0])
                    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnn",keys)
                    let columnNames= await getAllcolumnNameInATable(keys)
                    try{
                         console.log("yyyyyyyyyyyyyyyy",columnNames,"00000000000000")
                         let mainResponse={
                             "column":columnNames,
                             "data":response
                         }
                         console.log("fl;hgkggj.................??????",mainResponse,"fl;hgkggj.................??????")
                         res.status(200).send(mainResponse)
                    }
                    catch{

                    }

                }else{
                    res.status(404).send(response)

                }
            }).catch((err) =>{
                console.log(err)
            })
    }

    const getAllcolumnNameInATable=async(data)=>{
        return new Promise((resolve,reject)=>{
            let names=[]
            console.log(data,"d s;lfkjiojefjsk oiguiue bycwi")
            for(let x in data){
                let id=data[x].substring(3)
                console.log("id",id)
                entitiesModel.entities.findAll({
                    attributes: [
                        "name",
                        "type",
                    ],
                    where:{id:id}
                }).then((result) =>{
                
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
                        // console.log(names)
                        resolve(names)
                    }
                   
                })
                
                
            }
        })
    }




(async () => {
    await conn.sync();
})();

module.exports={records,
            menu_itemsUsersData,
            takeaway_types,
            entities,
               createRecordTable,
               record_type_entity_mapping,
               insertEntitiesMap,
               getFieldNameFromRecordTable,
               getTableNameFromEntity,
               getAllTableName,
               insertDataIntoRecordTable,
               deleteRecordTableByName,
               addColumnToRecordTable,
               addColumnToRecordTables,
               getAllDataInsideAReacordTable,
               addEntityToMapTable,
               createRecordType,
               getRecordTableByName
            }