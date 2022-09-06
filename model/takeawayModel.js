// const md5=require('md5')
// const db=require('../../config/config')

// const createTakeawayByAdmin=(data,next)=>{
//     // console.log("createdByadmin",data)
//     db.query(`INSERT INTO takeaway (takeaway_name, email, password,mobile,created_by)VALUES ('${data.name}', '${data.email}', '${data.password}','${data.mobile}',0)`,next)
// }
// const getAllTakeawayByEmail=(email,next)=>{
//     db.query(`select * from takeaway where email='${email}'`,next)
// }


// const deleteTakeawayById=(id,next)=>{
//     db.query(`delete from takeaway where id=${id}`,next)
// }

// const getAllTakeawayTypes = (next) => {
//     db.query("Select name from takeaway_types", next)
// }

// const createTakeawayType = (name, next) => {
//     db.query(`INSERT INTO takeaway_types (name) VALUES ('${name}')`,next)
// }
// const getTakeawayList = (next)=>{
//     return new Promise((resolve, reject)=> {
//         db.query("select takeaway_name, email, id, status, created_by,modified_at from takeaway order by modified_at DESC", (err, result)=> {
//             if(err) reject(err)
//             else resolve(result)
//         })
//     })
// }

// const getEntityList = (next)=>{
//     db.query("select name, description, id, status, modified_at from entities order By modified_at DESC", next)
// }

// const getTakeawayById = (takeawayId)=> {
//     // conn.query(`select t3.*, takeaway_types.name from takeaway_types right join 
//     // (select takeaway.*, t2.takeaway_type from takeaway left join takeaway_type_mapping t2 on takeaway.id = t2.takeaway_id where takeaway.id = ${takeawayId}) t3 
//     // on takeaway_types.id = t3.takeaway_type`, next)
//     return new Promise((resolve, reject)=> {
//         db.query(`select * from takeaway where id=${takeawayId}`, (err, result)=> {
//             if(err) reject(err)
//             else resolve(result)
//         }) 
//     }) 
// }
// // const getTypeOfTakeaways = (takeawayIds, shouldTakeawayIdAdd, next)=>{
// //     db.query(`select ${shouldTakeawayIdAdd?`t1.takeaway_id,`:""} t1.takeaway_type as typeId, t2.name from takeaway_type_mapping t1 left join takeaway_types t2 on t1.takeaway_type = t2.id where t1.takeaway_id in (${takeawayIds.join(',')})`, next)
// // }
// const changeTakeawayStatus=(id,status,next)=>{
//     db.query(`UPDATE takeaway  SET status =${status} WHERE id=${id} ;`,next)
// }

// const createTakeawayperson=(data,next)=>{
//     db.query(`insert into takeaway_persons(name,takeaway_id,role) values('${data.name}','${data.id}','Owner')`,next)
// }

// const mapTakeawayType=(data,next)=>{
//     db.query(`insert into takeaway_type_mapping(takeaway_id,takeaway_type)values('${data.takeawayId}','${data.type}')`,next)
// }

// const updateTakeaway=(id,data,next)=>{
//     db.query(`update takeaway set takeaway_name='${data.takeaway_name}',email='${data.email}',mobile='${data.mobile}' where id='${id}'`,next)
// }



// module.exports={
//     getTakeawayById,
//     changeTakeawayStatus,
//     createTakeawayperson,
//     mapTakeawayType,
//     updateTakeaway,
//     // getTypeOfTakeaways,
//     getEntityList,
//     getTakeawayList,
//     createTakeawayByAdmin,
//     getAllTakeawayByEmail,
//     deleteTakeawayById,
//     createTakeawayType, 
//     getAllTakeawayTypes
// }






const conn = require('../config/config')
const Sequelize = require('sequelize')
const entitiesModel = require('./entitiesModel')
const sequelize = require('sequelize')

const { DataTypes } = Sequelize;

const users = conn.define('users',{
    name:{
        type: DataTypes.STRING
    },
    mobile:{
        type: DataTypes.STRING
    },
    owner:{
        type: DataTypes.STRING
    },
    staff:{
        type: DataTypes.INTEGER
    },
    type:{
        type: DataTypes.INTEGER
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
    created_by:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.INTEGER
    },
    profile_setup:{
        type: DataTypes.INTEGER
    },
    refresh_token:{
      type: DataTypes.TEXT
    },
    role:{
     type: DataTypes.TINYINT(1)
    },
    cus_stripe_acc_Id:{
        type: DataTypes.STRING
    },
    stripe_subscription_Id:{
       type: DataTypes.STRING
    }
},

{
    freezeTableName:true
});
 
const  takeaway_personsTable = conn.define('takeaway_persons',{
    name:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    mobile:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    id_proof:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.INTEGER
    },
    takeaway_id:{
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

const entities = conn.define('entities',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        required:true,
        autoIncrement: true,

    },
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

const takeaway_type = conn.define('takeaway_types',{
    name:{
        type:DataTypes.STRING
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

const  takeaway_type_mapping = conn.define('takeaway_type_mapping',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        required:true,
        autoIncrement: true,

    },
    // userId:{
    //     type:DataTypes.INTEGER,
    //      references: {
    //     model:users,
    //     key: 'id'
    //     },
    //     onDelete: 'cascade',
    //     onUpdate: 'cascade'
    // },
    // takeawayTypeId:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model:takeaway_type,
    //         key: 'id'
    //         },
    //         onDelete: 'cascade',
    //         onUpdate: 'cascade'
        
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


const record_type_takeaway_mapping = conn.define('takeaway_mapping_records',{
    recordId:{
        type:DataTypes.INTEGER,
        model: records,
        key: 'id',
        foreignKeyConstraint: true 
    },
    userId:{
        type:DataTypes.INTEGER,
        model: users,
        key: 'id',
        foreignKeyConstraint: true 
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

users.hasOne(takeaway_type_mapping)
takeaway_type_mapping.belongsTo(users)

takeaway_type.hasOne(takeaway_type_mapping)
takeaway_type_mapping.belongsTo(takeaway_type)


users.hasMany(record_type_takeaway_mapping)
record_type_takeaway_mapping.belongsTo(users,{foreignKey:'id'})


records.hasMany(record_type_takeaway_mapping)
record_type_takeaway_mapping.belongsTo(records,{foreignKey:'id'})

    const getCountPerRecordInsertedByTakeaway=(tablename,takeawayId)=>{
        return new Promise((resolve,reject)=>{
            let sql = (`select id from ${tablename} where userId='${takeawayId}'`)
                conn.query(sql,{type:Sequelize.QueryTypes.SELECT},(err,result)=>{
                if(err)reject (err)
                else{
                    resolve(result)
                }
            })
  
        })
    }
    const getDataFromRecordTableForTakeaway=(table_name, user_Id, next,res) =>{
        console.log(table_name,user_Id)
        let sql = `select * from ${table_name} where userId=${user_Id}`
        conn.query(sql,{type:Sequelize.QueryTypes.SELECT},next).then(async(result2) =>{
            console.log(result2,"----------------->>><<<<<<<<<<")
            if(result2&&result2.length>0){
                let keys=Object.keys(result2[0])
                let columnNames= await getAllcolumnNameInATable(keys,result2)
                try{
                     console.log(columnNames,"drgfjiofghjnxcg,kjl")
                     let mainResponse={
                         "column":columnNames,
                         "data":result2    
                     }
                     console.log(mainResponse,"mainResponse")
                     res.status(200).send(mainResponse)
                     console.log("icvsdjbsdjv")
                }
                catch{
                    res.status(500).send("Something went wrong")
                }
            }else{
                res.status(404).send("No data")
            }
        }).catch((err) =>{
            console.log(err)
        })
    }
    const getAllcolumnNameInATable = async (data) => {
        return new Promise((resolve, reject) => {
          let names = [];
          console.log(data,"sdgjhifehsaiuawethiuewfhliusd")
          for (let x in data) {
            let id = data[x].substring(3);
            console.log(id,"gjytuynry")
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
      const getTypeOfTakeaways = (takeawayIds, shouldTakeawayIdAdd, next)=>{
        conn.query(`select ${shouldTakeawayIdAdd?`t1.userId ,`:""} t1.takeawayTypeId as typeId, t2.name from takeaway_type_mapping t1 left join takeaway_types t2 on t1.takeawayTypeId = t2.id where t1.userId in (${takeawayIds.join(',')})`, next)
    }
        
   
(async () => {
    console.log("------------------------------------")
    await conn.sync();
})();


module.exports={records,users,getTypeOfTakeaways,entities,takeaway_type,takeaway_personsTable,takeaway_type_mapping,record_type_takeaway_mapping,getCountPerRecordInsertedByTakeaway,getDataFromRecordTableForTakeaway}
