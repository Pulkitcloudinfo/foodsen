
const ErrorNames = require('../utils/ErrorNames')
const adminProductModel = require('../model/productModel')



const getProductList = async(req,res) =>{
await adminProductModel.products.findAll().then((data)=>{
res.send(data)
}).catch((err)=>{
    console.log(err)
})
}
const createProducts = async(req, res) =>{
   await adminProductModel.products.create(req.body)
   .catch((err)=>{
    console.log(err)
   })
   
    res.send("successfully inserted")
}
const changeProductStatus=(req,res)=>{
    console.log(req.body)
    adminProductModel.products.update({status: req.body.status},{
        where:{id: req.body.id}
    })
   
    res.send("successfully status changed")
}         
const deleteProductById = async(req, res) =>{
    // const id = req.body.id
    console.log(req.body)
    await adminProductModel.products.destroy({where:{id: req.body.id}})
    .catch((err) =>{
        console.log(err)
    })
    res.send("successfully deleted")
  }
  const getAllProductById=(id,res)=>{
    console.log(id)
    adminProductModel.products.findAll({where:{id: id}}).then((data) =>{
        res.send(data)
}).catch((err)=>{
    console.log(err)
    })
  
}

const updateProductById = async(req, res) =>{
    await adminProductModel.products.update(
        {
        name: req.body.data.name,
        category: req.body.data.category,
        measurement: req.body.data.measurement,
        description: req.body.data.description,
        status: req.body.data.status,
        label: req.body.data.label,
    },
    {
        where:{
             id: req.body.data[0].id
            },
        })
    .catch((err) =>{
        console.log(err)
    })
    res.send("successfully updated")
}

module.exports={
    getAllProductById,
    getProductList,
    createProducts,
    deleteProductById,
    updateProductById,
    changeProductStatus
}