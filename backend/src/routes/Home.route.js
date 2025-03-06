const router=require('express').Router()
const {GetAllUsers, GetUser}=require('../controller/GetUsers.controller.js')
const { authentication } = require('../middleware/Auth.middleware.js')


router.get('/',(req,res)=>{
    res.json('Hello World')
})
router.get('/getAllUsers',authentication,GetAllUsers)
router.get('/getUser',authentication,GetUser)

module.exports=router