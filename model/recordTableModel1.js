const conn=require('./../config/config')

const getAllRecordTypes = (next)=>{
  conn.query("select id, name, status from records", next)
}

const mapRecordTypesToTakeaways = (selected,takeawayId, next) => {
  
  let queryStr = "insert into users_mapping_records (record_type_id, takeaway_id) values "
  for(const id of selected.values()){
    queryStr += `('${id}','${takeawayId}'),`
  }
  queryStr = queryStr.slice(0,-1)  // to delete comma at last
  
  conn.query(queryStr, next)
}

const createRecordEntry = (req,next) => {
  let queryStr = `insert into ${req.recordTableName} (takeaway_id,${Object.keys(req.data).join(',')}) values ('${req.takeawayId}','${Object.values(req.data).join("','")}')`
  conn.query(queryStr, next)
}

const editRecordEntry = (req, next)=> {
  let queryStr = `update ${req.recordTableName} set `
  for(const k in req.data){
    queryStr += `${k} = '${req.data[k]}',`
  }
  queryStr = queryStr.slice(0, -1)
  queryStr += ` where id = '${req.recordId}'`
  conn.query(queryStr, next)
}
const getRecordTableName=(id)=>{
  return new Promise((resolve,reject)=>{
    conn.query(`select * from records where id='${id}'`,(err,result)=>{
      if(err)reject(err)
      else{
        resolve(result)
      }
    })
  })
}

const getDataFromRecordTableForTakeaway=(tablename,takeaway_id)=>{
  return new Promise((resolve,reject)=>{
    conn.query(`select * from ${tablename} where takeaway_id=${takeaway_id}`,(err,result)=>{
      if(err)reject(err)
      else{
        resolve(result)
      }
    })
  })
}

module.exports = {
  getAllRecordTypes,
  mapRecordTypesToTakeaways,
  createRecordEntry,
  editRecordEntry,
  getRecordTableName,
  getDataFromRecordTableForTakeaway
}