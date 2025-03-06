const express=require('express');
const bodyParser=require('body-parser');
const  connectDB  = require('./database/ConnectDB');
const homeRoute = require('./routes/Home.route.js');
const authRoute=require('./routes/Auth.route.js')
require("dotenv").config()

const app=express()


app.use(express.json())
app.use('/api/home',homeRoute)
app.use('/api/auth',authRoute)

connectDB()

app.listen(8001,()=>{
    console.log('Server is running on port 8001')
})