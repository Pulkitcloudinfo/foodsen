const port=4000
const express = require("express");
const app=express()
const cors = require('cors')
const dotenv = require('dotenv')
// const router=require('./route/route')
const router = require('./route/router')
const conn = require('./config/config')
//const bcrypt = require('bcrypt');
const { default: axios } = require("axios");
const saltRounds = 5;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path')
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors())
app.use(cors({ credentials:true, origin:['http://localhost:3000','http://localhost:4000/getAllMappingData']}));

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use('/uploads', express.static(path.join(__dirname,  'uploads')))

app.use('/', function (req, res, next) {
   // req.session.isAuth = true
  res.setHeader('Access-Control-Allow-Origin', '*');
   next();
}); 

app.get('/test',function(req,res){
    // req.session.isAuth = true
    // res.send("hello")   
})
app.get('/testpassword',function(req,res){
    bcrypt.hash(req.body.name, saltRounds, function(err, hash) {
        if(err) console.log(err)
        res.send(hash)
    });
    
})
app.listen(port,()=>{
    console.log("listen on "+ port)
})

 