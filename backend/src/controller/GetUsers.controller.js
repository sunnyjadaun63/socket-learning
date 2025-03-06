const UserSchema = require("../model/User.schema.js");


const GetAllUsers=async(req,res)=>{
    try{
        const users=await UserSchema.find({})
        return res.status(200).json({message:"All users",users})

    }
    catch(error){
        console.log('error: ', error);
        return res.status(500).json({message:"Internal server error",error})
    }
}
const GetUser=async(req,res)=>{
    try{
        
       const user=req.user
      delete user.password
      return res.status(200).json({message:"User found successfully",user})
 
      


    }
    catch(error){
        console.log('error: ', error);
        return res.status(500).json({message:"Internal server error",error})
    }
}

module.exports={GetAllUsers,GetUser}