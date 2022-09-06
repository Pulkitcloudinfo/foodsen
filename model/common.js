const conn=require('../config/config')
const sequelize = require('sequelize')
const QueryTypes = require('sequelize')
const { Sequelize } = require('sequelize')


const getColumnReferences = (tableName, columnName) => {
  let sql = (`SELECT 
      TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME
  FROM
      INFORMATION_SCHEMA.KEY_COLUMN_USAGE
  WHERE
      REFERENCED_TABLE_SCHEMA = 'foodsenso' AND
      REFERENCED_TABLE_NAME = '${tableName}' AND
      REFERENCED_COLUMN_NAME = '${columnName}'
  `)
  conn.query(sql,{type:Sequelize.QueryTypes.SELECT})
}
const deleteEntryFromTable = (tableName, columnName, columnVal)=> {
  let sql = (`delete from ${tableName} where ${columnName}='${columnVal}'`)
  conn.query(sql,{type:Sequelize.QueryTypes.DELETE})
}

const countOfAllTakeaways=()=>{
  return new Promise((resolve,reject)=>{
    conn.query(`select count(id) from takeaway`,(err,result)=>{
      if(err) reject(err)
      else{
        resolve(result)
      }
    })
  })
}



module.exports = {
  getColumnReferences, deleteEntryFromTable,countOfAllTakeaways
}