import bcrypt from "bcrypt";
import User from "../models/Users.js";
import jwt from 'jsonwebtoken';


export const login = async (req,res) => {
    try {
         const { username, password } = req.body;
         console.log("username: ",username);
         console.log("password: ", password);
         
         
         if(username == ""){
           return res.status(404).json({error: "Username field is empty !!"});
         }

         const user = await User.findOne({UserName:username});
         if(!user){
           return  res.status(404).json({error: "User not found !!"});
         };
         const matchPassword = await bcrypt.compare(password, user.Password);
         if(!matchPassword){
           return  res.status(404).json({error: "wrong password.... Authentication failed !!"});
         }

         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
         });

         res.status(200).json({token: token});

    } catch (error) {
        console.log(error);
        
        res.status(404).json({error:"Authentication Failed !!"})
    }
};