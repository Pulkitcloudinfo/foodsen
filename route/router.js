const express=require('express')
const menuItemsKitAppContr = require('../controllers/menuItemsKitAppContr')
const loginController=require('../controllers/login')
const takeawayController = require('../controllers/takeawayContr')
const adminSurveyorController=require('../controllers/surveyorContr')
const entitiesController=require('../controllers/entities')
const recordTableController=require('../controllers/recordTableController')
const AppliancesContr=require('../controllers/appliancesContr')
const adminProductContr=require('../controllers/productContr')
const verifyToken = require('../utils/VarifyToken')
const refreshToken = require('../controllers/refreshToken')
const mediaController = require('../controllers/mediaContr')
const stripeSubController = require('../controllers/stripeSubController')
const multer = require ('multer')
const path = require('path')


const  bodyParser = require('body-parser')

const router=express.Router()

router.use(bodyParser.urlencoded({ extended: true}))
router.use(bodyParser.json())


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
          return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
      }
      cb(null, true)
  }
});


const upload = multer({ storage: storage }).single("file");


router.get('/getAllMedia', (req,res)=>{
    mediaController.getAllMedia(req, res)
  })
  router.post("/createMedia", (req, res) => {


    console.log("request body of media   ===================>");
    console.log(req.body);

    upload(req, res, err => {
        console.log(req.file);
        console.log(req.body);
        
        if (!req.file) return res.send('Please ')

        if (err) {
            return res.json({ success: false, err });
        }
        console.log("read to send res from router ===================>",res.req.body.name);

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename,Name: res.req.body.name,Cost: res.req.body.cost , Date:res.req.body.date});
        // mediaController.uploadImage(req, res)
    });
});


router.post("/thumbnail", (req, res) => {

mediaController.createThumbnail(req, res)
});
router.get('/users', function(req, res){
    verifyToken.verifyToken(req, res)
  })
  
   router.post('/sub', function(req, res){
    stripeSubController.createSubscription(req, res)
   })
   router.get('/getAllItemById', (req, res)=> {
    console.log(req.query);
    const id = req.query.id 
    stripeSubController.getAllItemById(id,res)
  })
  
   router.post('/pay', async(req, res) =>{
    stripeSubController.createPayment(req, res)
   })

  router.post('/login',function (req,res) {
    console.log(req.cookies);
      loginController.login(req,res)
  })
  
  router.get('/token', function(req ,res){
    refreshToken.refreshToken(req,res)
    
  })
  router.get('/getAllMappingData', function(req, res){
    stripeSubController.getAllMappingData(req, res)
  })
  router.post('/registerTakeaway',function (req,res) {
    takeawayController.registerTakewayByAdmin(req,res)
    // console.log(res,"res")
  })
  router.delete('/deleteTakeaway',function (req,res) {
    // const id = req.body.id
    console.log(req.body.id,"id from adminroute")
    takeawayController.deleteTakeaway(req,res)
  })
  router.patch('/changeTakeawayStatus', (req, res)=> {
    // adminSurveyorController.changeSurveyorStatus(req,res)
    takeawayController.changeTakeawayStatus(req,res)
  })
  router.patch('/updateTakeaway', (req, res)=> {
    // adminSurveyorController.changeSurveyorStatus(req,res)
    console.log(req.body,"from route")
    takeawayController.updateTakeaway(req,res)
  })
  router.get('/countOfAllTakeaways',(req,res)=>{
    takeawayController.countOfAllTakeaways(req,res)
  })
  router.post('/createProduct', (req, res) =>{
    console.log("data")
    adminProductContr.createProducts(req, res)
  })
  router.delete('/deleteProductById',(req, res) =>{
    
    adminProductContr.deleteProductById(req, res)
  })
  router.patch('/updateProductById', (req, res) =>{
    adminProductContr.updateProductById(req, res)
  })
  router.patch('/changeProductStatus',(req, res) =>{
    adminProductContr.changeProductStatus(req, res)
  })
  router.get('/getAllProductById', (req, res)=> {
    const id = req.query.id 
    adminProductContr.getAllProductById(id,res)
  })
  
  router.get('/getProductList',(req,res) =>{
    adminProductContr.getProductList(req, res)
  })
  router.get('/getEntityBydata',(req,res) =>{
    entitiesController.getEntityBydata(req, res)
  })
  
  router.post('/registerSurveyor',function (req,res) {
    adminSurveyorController.registerSurveyorByAdmin(req,res)
    
  })
  router.delete('/deleteSurveyor',function (req,res) {
    adminSurveyorController.deleteSurveyor(req,res)
  })
  router.post('/createEntity',function (req,res) {
    entitiesController.createEntity(req,res)
  })
  
  router.delete('/deleteEntity',function (req,res) {
    entitiesController.deleteEntity(req,res)
  })
  router.get('/getEntityById',function (req,res) {
    const id = req.query.id
    entitiesController.getEntitiesByIds(id,res)
  })
  router.patch('/updateEntity',function (req,res) {
    entitiesController.updateEntity(req,res)
  })
  
  router.post('/createRecordType',function (req,res) {
    const reqObj = {
      name: req.body.name,
      entityIds:req.body.entityIds    // array of id of entities
    }
    // console.log(reqObj.entityIds)
    recordTableController.createRecordType(reqObj,res)
  })
  
  router.get('/recordTypeList', (req, res)=> {
    recordTableController.getAllRecordTypes(res)
  })
  
  router.delete('/deleteRecordType',function (req,res) {
    recordTableController.deleteRecordTable(req,res)
  })
  router.post('/createEntity',function (req,res) {
    const reqObj = {
      recordTypeId: req.body.recordTypeId,
      tableName: req.body.tableName,
      entityIds : req.body.entityIds
    }
    recordTableController.createEntity(reqObj,res)
  })
  
  router.post('/createTakeawayType', (req, res)=> {
    const name = req.body.name
    takeawayController.createTakeawayType(name, res)
  })
  
  router.get('/takeawayList', (req, res)=>{
    takeawayController.getTakeawayList(res)
  })
  
  router.get('/entityList', (req, res)=>{
    takeawayController.getEntityList(res)
  })
  
  router.get('/surveyorList', (req, res)=> {
    adminSurveyorController.getSurveyorList(res)
  })
  router.patch('/changeSurveyorStatus', (req, res)=> {
    adminSurveyorController.changeSurveyorStatus(req,res)
  })
  router.patch('/changeEntityStatus', (req, res)=> {
    entitiesController.changeStatus(req,res)
  })
  router.patch('/changeRecordTypeStatus', (req, res)=> {
    recordTableController.changeRecordTypeStatus(req,res)
  })
  
  router.get('/getTakeawayById', (req, res)=> {
    const id = req.query.id
    takeawayController.getTakeawayById(id, res)
  })
  router.get('/getSurveyorById', (req, res)=> {
    const id = req.query.id 
    adminSurveyorController.getSurveyorById(id,res)
    // console.log(res,"get")
  })
  
  router.patch('/editSurveyor', (req, res)=> {
    adminSurveyorController.editSurveyor(req,res)
  })
  
  
  router.patch('/editEntity',(req,res)=>{
    entitiesController.editEntity(req,res)
  })
  
  router.get('/getAllTakeawayTypes',(req,res)=>{
    recordTableController.getAllTakeawayTypes(req,res)
  })
  router.get("/allMenuItems",(req,res)=>{
    recordTableController.getAllMenuItems(req,res)
  })
  router.patch("/changeMenuItemStatus",(req,res)=>{
    recordTableController.changeMenuItemStatus(req,res)
  })
  router.get('/getMenuItemById',(req,res)=>{
    const id = req.query.id
    console.log(id,"from routes")
    recordTableController.getMenuItemsById(id,res)
  })
  router.post('/createMenuItems',(req,res)=>{
    recordTableController.createMenuItems(req,res)
  })
  router.patch('/updateMenuItems',(req,res)=>{
    recordTableController.updateMenuItems(req,res)
  })
  
  router.delete('/deleteMenuItemById',(req,res)=>{
    recordTableController.deleteMenuItemById(req,res)
  })
  
  router.get('/getAppliances',(req,res)=>{
    AppliancesContr.getAllAppliances(req,res)
  })
  router.post('/createAppliances',(req,res)=>{
    AppliancesContr.createAppliances(req,res)
  })
  router.patch('/changeAppliancesStatus',(req,res)=>{
    AppliancesContr.changeAppliancesStatus(req,res)
  })
  router.patch('/updateAppliancesById',(req,res)=>{
    AppliancesContr.updateAppliancesById(req,res)
  })
  router.delete('/deleteAppliancesById',(req,res)=>{
    AppliancesContr.deleteAppliancesById(req,res)
  })
  
  router.get('/getAppliancesById',(req,res)=>{
    AppliancesContr.getAppliancesById(req,res)
  })
  
  router.get('/getRecordTableDetails',(req,res)=>{
    recordTableController.getRecordTableById(req,res)
  })
  
  router.patch('/updateRecordtype',(req,res)=>{
  
    recordTableController.updateRecordtype(req,res)
  })
  
  router.get('/getTableByIdForRecordCreation',(req,res)=>{
    const id = req.query.id
    recordTableController.getTableByIdForRecordCreation(id,res)
  })
  
  router.post('/createRecord',(req,res)=>{
    recordTableController.createRecord(req,res)
    
  })
  
  router.get('/getAllDataInsideAReacordTable',(req,res)=>{
    recordTableController.getAllDataInsideAReacordTable(req,res)
  })
  router.get('/getAllDataInsideAReacordTable1',(req,res)=>{
    recordTableController.getAllDataInsideAReacordTable1(req,res)
  })
  router.get('/getFieldNameFromRecordTable',(req,res) =>{
    const name = req.query.name
    recordTableController.getFieldNameFromRecordTable(name, res)
  })
  router.get('/getTableNameFromEntity',(req,res) =>{
    const name = req.query.name
    recordTableController.getTableNameFromEntity(name, res)
  })
  router.get('/getAllTableName',(req,res) =>{
    const table_type = req.query.table_type
    recordTableController.getAllTableName(table_type, res)
  })
  
  
  router.post('/signup', (req, res)=>{
    const reqObj = {
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      password: req.body.password,
      takeawayName:req.body.takeawayName,
      takeawayTypeId: req.body.takeawayTypeId   // array
    }
    takeawayController.signup(reqObj, res)
  })
  
  router.post('/addStaff', (req, res)=>{
    const reqObj = {
      takeawayId: req.body.takeawayId,
      role: req.body.role,
      name: req.body.name,
      mobileNo: req.body.mobileNo,
      address: req.body.address,
      idProof: req.body.idProof,
      email: req.body.email
    }
    takeawayController.addTakeawayStaff(reqObj, res)
  })
  
  router.get('/getStaff', (req, res)=> {
    // could not use req.body because it was coming empty
    const takeawayId = req.query.takeawayId
    takeawayController.getStaff(takeawayId,res)
  })
  
  
  router.get('/menuItems', (req, res)=> {
    const takeawayTypeId = req.query.takeawayTypeId
    menuItemsKitAppContr.getAllMenuItems(takeawayTypeId,res)
  })
  
  router.post('/mapMenuItems', (req, res)=>{
    const reqObj = {
      selected: req.body.selected,
      new: req.body.new,
      takeawayId : req.body.takeawayId
    }
    menuItemsKitAppContr.mapMenuItems(reqObj, res)
  })
  
  router.get('/recordTypes', (req, res)=>{
    recordTableController.getAllRecordTypes(res)
  })
  
  router.post('/mapRecordTypes', (req, res)=> {
    const reqObj = {
      selected: req.body.selected,
      takeawayId: req.body.takeawayId
    }
    recordTableController.mapRecordTypesToTakeaways(reqObj, res)
  })
  
  router.get('/kitchenAppliances', (req, res)=> {
    menuItemsKitAppContr.getKitchenAppliances(res)
  })
  
  router.post('/mapKitchenAppliances', (req, res)=> {
    
    const reqObj = {
      selected: req.body.selected,
      new: req.body.new,
      takeawayId : req.body.takeawayId
    }
    menuItemsKitAppContr.mapKitchenAppliances(reqObj, res)
  })
  
  router.post('/createRecordEntry', (req, res)=> {
    const reqObj = {
      recordTableName: req.body.recordTableName,
      takeawayId: req.body.takeawayId,
      data: req.body.data    // data = {columnName: DATA, columnName: DATA}
    }
    // console.log(reqObj)
    recordTableController.createRecordEntry(reqObj, res)
  })
  
  router.patch('/editRecordEntry', (req, res)=> {
    const reqObj = {
      recordTableName: req.body.recordTableName,
      recordId: req.body.recordId,
      data: req.body.data  // data = {columnName: DATA, columnName: DATA}
    }
    recordTableController.editRecordEntry(reqObj, res)
  })
  
  router.get('/takeawayTypes', (req, res)=> {
    takeawayController.getTakeawayTypes(res)
  })
  
  router.get('/recordTypesOfTakeaway', (req, res)=> {
    const takeawayId = req.query.takeawayId
    console.log(takeawayId,"from routes")
    loginController.getRecordTypesOfTakeaway(takeawayId, res)
  })
  
  router.get('/recordData', (req, res)=> {
    const reqObj = {
      takeawayId: req.query.takeawayId,
      recordTypeId: req.query.recordTypeId,
      date: req.query.date       // date = YYYY-MM-DD    // optional
    }
    takeawayController.getRecordData(reqObj, res)
  })
  
  router.get('/entitiesOfRecordType', (req, res)=> {
    const recordTypeId = req.query.recordTypeId
    console.log(recordTypeId,"from routes")
    takeawayController.getEntitiesOfRecordType(recordTypeId, res)
  })
  
  
  router.get('/getAllMenuItems',(req,res)=>{
    menuItemsKitAppContr.getAllActiveMenuItems(req,res)
  })
  
  router.post('/profileSetup',(req,res)=>{
    takeawayController.profileSetup(req,res)
  }) 
  router.get('/getTakeawayDataInsideAReacordTable',(req,res)=>{
    takeawayController.getTakeawayDataInsideAReacordTable(req,res)
  })
  
  module.exports=router