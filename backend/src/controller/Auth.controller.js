const { encryptPassword, deCryptPassword } = require("../helper/encryptPassword");
const { genarateToken } = require("../helper/genarateToken.js");
const GenarateUsername = require("../helper/genarateUsername");
const userModel = require("../model/User.schema.js");

const Register=async(req,res)=>{
    try {
        const { email, password, name, age } = req.body;
        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "Email or password not provided" });
        }
        const isExistEmail = await userModel.findOne({ email });
        if (isExistEmail) {
          return res.status(404).json({ message: "User already exist with email" });
        }
    
        const genarateUsername = await GenarateUsername(email);
        const HashedPassword = await encryptPassword(password);
    
        const user = await userModel.create({
          email,
          password: HashedPassword,
          name,
          age,
          userName: genarateUsername,
        });
    
        return res
          .status(201)
          .json({ message: "Ek or user created succesfully" });
      } catch (error) {
        return res.status(500).json({ message: " jaana tu internal server error", error });
      }

}

const Login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res
            .status(401)
            .json({ message: "Email or passwrord nhi diyaa re" });
        }
    
        let user = await userModel.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: "User does not exist" });
        }
        let HashedPassword = await deCryptPassword(password, user.password);
        if (HashedPassword) {
          const token = await genarateToken(user);
          const newUser = user;
    
          const { ...usersdata } = newUser;
    
          delete usersdata._doc.password;
    
          return res
            .status(200)
            .json({
              message: "User Found successfully",
              user: usersdata._doc,
              token,
            });
        } else {
          return res.status(401).json({
            message:
              "Password match nhi huaa re yaad kr  kya tha last password",
          });
        }
      } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ message: "Kuch Galat Ho giyaaaaaaa",error });
      }
}


module.exports={
    Register,
    Login
}