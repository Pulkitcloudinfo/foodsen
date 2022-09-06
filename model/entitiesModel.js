const conn = require('../config/config')
const Sequelize = require('sequelize');
const sequelize = require('sequelize')


const { DataTypes } = Sequelize;


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
 
const addColumnToRecordTable=(tablename,columnsStr)=>{
    conn.define(`${tablename} ${columnsStr}`)
  }


const getEntitiesByIds = (ids, next)=> {
  let queryStr = `select name from entities where id in (${ids.join(',')})`
  conn.define(queryStr, next)
}


const Table = conn.query('SHOW Tables',{
    type: sequelize.QueryTypes.SHOWTABLE
},
{
    freezeTableName:true
});

(async () => {
    await conn.sync();
})();


module.exports={entities,addColumnToRecordTable,Table,getEntitiesByIds}