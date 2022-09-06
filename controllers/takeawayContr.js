
const ErrorNames = require('../utils/ErrorNames')
const adminTakeawayModel=require('../model/takeawayModel')
const common = require('../model/common')
const conn = require('../config/config')

const registerTakewayByAdmin= async (req,res)=>{
    console.log(req.body,"data2")
  
    await adminTakeawayModel.users.findAll({
        where:
        {
            email:req.body.email
        }
    })
    .then((result1) =>{
        if(result1.length>0){
            console.log("email alredy exist")
            res.status(400).send("Email Already Exist")
        }
        else{
            console.log(req.body,"ok")
            let owner=req.body.owner
            let type=req.body.type
            adminTakeawayModel.users.create(req.body).then((result)=>{
                console.log(result,"result")
                if(result){
                    let  id=result.id
                    let owner=result.name
                    let email=result.email
                    let password=result.password
                    let mobile=result.mobile
                    console.log("success",id)
                    let data={
                        id:id,
                        name:owner,
                        email:email,
                        password:password,
                        mobile:mobile,

                }
                    console.log(data,"data from line no 34")
                   adminTakeawayModel.takeaway_personsTable.create({name:data.name,takeaway_id:data.id,role:'Owner',email:data.email,password:data.email,mobile:data.mobile})
                   .then((res)=>{
                    console.log(res,"from 44 line")
                    if(res){

                            let dataToMapType={
                                takeawayId:id,
                                type:type
                            }
                            console.log(dataToMapType,"from 59")
                            adminTakeawayModel.takeaway_type_mapping.create({userId:dataToMapType.takeawayId,takeawayTypeId:dataToMapType.type})
                            .then((res) =>{
                                console.log(res,"res from 47")
                            }).catch((err) =>{
                                console.log(err)
                            })
                        }
                        })
                    }else{
                        console.log(res,"result is not found")
                    }
                    })
                }
            })
        }

const deleteTakeawayById = (req, res)=> {
    console.log(req,"idfggtffbh")
    // return new Promise((resolve, reject)=> {
        adminTakeawayModel.users.destroy({where:{id: req}}).then((data) =>{
            // res.send(data)
        })
        .catch((err) =>{
            console.log(err)
        })
        
      }
// }

const deleteTakeaway=(req,res)=>{

    deleteTakeawayById(req.body.id,(err, result) =>{
        if(result){
// .then((data)=> {
        res.status(200).send("TakeAway Deleted Successfully")   
        console.log('TakeAway Deleted Successfully') 
        }   else{

        // }
    // })
    // .catch((error)=> {
        if(error.errno == 1451){  // foreign key reference error
            common.getColumnReferences('takeaway','id', (err, result)=> {
                if(err) return res.status(500).send(err)
                if(result.length == 0){
                    deleteTakeawayById(req.body.id)
                    .then(()=> res.status(200).send("TakeAway Deleted Successfully"))
                    .catch((err12)=> res.status(500).send("Something went wrong " + err12))
                    return
                }
                let i = 0
                for(const obj of result.values()){
                    common.deleteEntryFromTable(obj.TABLE_NAME, obj.COLUMN_NAME, req.body.id, (err2, result2)=> {
                        if(err2) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err2)
                        i += 1
                        if(i === result.length){
                            deleteTakeawayById(req.body.id)
                            .then(()=> res.status(200).send("TakeAway Deleted Successfully"))
                            .catch((err12)=> res.status(500).send("Something went wrong " + err12))       
                        }
                    })
                }
            })
        }
    }
    })

    
    
}
//1451


const createTakeawayType = (nameArg, res) =>{
    const name = nameArg.toLowerCase()
    console.log(name,"name")

    adminTakeawayModel.takeaway_type.findAll({attributes:['name']},(err, result)=>{
        if(err){
            res.sendStatus(500)
            return console.log(err)
        }
        console.log(result)
        if(result.findIndex((item)=> item.name == name) != -1 ){
            res.status(400).send(ErrorNames.alreadyExist)
            return
        }


        adminTakeawayModel.takeaway_type.create(name, (err2, result2) => {
            if(err2){
                console.log(result2)
                res.status(500).send(ErrorNames.somethingWentWrong)
            }
            else
                res.send(ErrorNames.takeawayTypeCreated)
        })
    })

}

const getTakeawayDataInsideAReacordTable=(req,res)=>{
    let takeaway_id=req.query.userId
    let record_id=req.query.recordId
    console.log(takeaway_id,record_id)
    adminTakeawayModel.record_type_takeaway_mapping.findAll({where:{recordId :record_id,userId:takeaway_id}})
    .then((result)=>{
        console.log(result);
        if(result && result.length>0){
            recordModel.getRecordTableName(record_id)
            .then((result1)=>{
                console.log(result1)
                recordModel.getDataFromRecordTableForTakeaway(result1[0].tablename,takeaway_id)
                .then(async(result2)=>{
                    console.log(result2)       
                    if(result2&&result2.length>0){
                        // res.status(200).send(result2)
                        let keys=Object.keys(result2[0])
                        let columnNames= await getAllcolumnNameInATable(keys,result2)
                        try{
                             console.log(columnNames)
                             let mainResponse={
                                 "column":columnNames,
                                 "data":result2    
                             }
                             console.log(mainResponse)
                             res.status(200).send(mainResponse)
                             console.log("icvsdjbsdjv")
                        }
                        catch{
                            res.status(500).send("Something went wrong")
                        }
                    }else{
                        res.status(404).send("No data")
                    }
                })
                .catch((e2)=>{
                console.log(e2)
                    res.status(500).send('somethingWentWrong' + e2)
                })
            })
            .catch((e1)=>{
                console.log(e1)
                res.status(500).send("Something went wrong")
            })
        }
    })
    .catch((e)=>{
        console.log(e)
        res.status(500).send("Something went Wrong")
    })


}

const getTakeawayList = (res)=>{
    adminTakeawayModel.users.findAll()
    .then((modelRes)=> {
        // recursiveFun(modelRes,0)
        // res.send(modelRes)
        console.log(modelRes,"model")
        const arrIds = []
        for(const val of modelRes)
            arrIds.push(val.id)
            console.log(arrIds,"ids")
        adminTakeawayModel.takeaway_type_mapping.create({
            where:{userId:arrIds},
            attributes: {exclude: ['createdAt','updatedAt']},
            include: [{
                model: adminTakeawayModel.takeaway_type,
                attributes: {exclude: ['id','createdAt','updatedAt']},
                // where: ["takeaway_type_mapping.userId=arrIds"],
                required: false,
               }]
        })
        // let shouldTakeawayIdAdd = false
        // const takeawayId = result[0].id
        // let takeawayIds = [takeawayId]
        // console.log("sfndjk")
        // conn.query(`select ${shouldTakeawayIdAdd?`t1.userId,`:""} t1.takeawayTypeId as typeId, t2.name from takeaway_type_mapping t1 left join takeaway_types t2 on t1.takeawayTypeId = t2.id where t1.userId in (${takeawayIds.join(',')})`,)
        .then((result) =>{
            console.log(result,"result")
            if(result) return res.status(200).send(modelRes)

            for(let i = 0; i< modelRes.length; i++){
                const arr = []
                for(const item of result.values()){
                    if(item.takeaway_id === modelRes[i].id){
                        delete item.takeaway_id
                        arr.push(item)
                    }
                }
                console.log(arr,"array")
                if(arr.length > 0){
                    modelRes[i].type = arr
                }
            }
            res.send(modelRes)
        })
        
    })
    .catch((err)=> res.send(ErrorNames.somethingWentWrong + " " + err))
}


const getTakeawayById = (takeawayId, res) => {
console.log(takeawayId,"idfdgdgg")
    adminTakeawayModel.users.findAll({where:{id:takeawayId}})
    .then(response=> {
        let shouldTakeawayIdAdd = false
        let takeawayIds = [takeawayId]
        // adminTakeawayModel.getTypeOfTakeaways([takeawayId], false,(err, result)=> {
            conn.query(`select ${shouldTakeawayIdAdd?`t1.userId ,`:""} t1.takeawayTypeId as typeId, t2.name from takeaway_type_mapping t1 left join takeaway_types t2 on t1.takeawayTypeId = t2.id where t1.userId in (${takeawayIds.join(',')})`).then((data) =>{
            if (data) 
            response[0].type = data
            res.send(response[0])
            console.log(response[0],"n")
           
        }).catch((err) =>{
         res.status(500).send(ErrorNames.somethingWentWrong + " " + err)
        }
        
        )
        
    })
    .catch(err=> res.status(500).send(ErrorNames.somethingWentWrong + " " + err))
}

const getEntityList = (res)=>{
    adminTakeawayModel.entities.findAll()
    .then((data) =>{
        res.send(data)
}).catch((err)=>{
    console.log(err)
    })

}
const changeTakeawayStatus=(req,res)=>{
    adminTakeawayModel.users.update({status:req.body.status},{where:{id: req.body.id}},(err,result)=>{
        if(err)  res.status(500).send(ErrorNames.somethingWentWrong)
        else{    
            res.status(200).send("Ok") 
            console.log(result)
        } 
    })
    console.log(req.body)
}

const updateTakeaway=(req,res)=>{
    console.log(req.body.id,"pewkjfiorejjfds-------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    adminTakeawayModel.users.update({
        name: req.body.data.takeaway_name,
        email: req.body.data.email,
        mobile: req.body.data.mobile,
    },{
        where:{id:req.body.id}
    }).then((data) =>{
        if(data) 
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send(ErrorNames.somethingWentWrong)
    })
}

const countOfAllTakeaways=(req,res)=>{
    adminTakeawayModel.users.count({
        col: 'id'
    })
    .then((response)=>{
        console.log(response)
        res.send([response])
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}


module.exports={
    getTakeawayById,
    getEntityList, getTakeawayList, registerTakewayByAdmin,deleteTakeaway, createTakeawayType,
    changeTakeawayStatus,updateTakeaway,countOfAllTakeaways,getTakeawayDataInsideAReacordTable
}