const { Register, Login } = require('../controller/Auth.controller')

const router=require('express').Router()

router.post('/register',Register)
router.post('/login',Login)

module.exports=router