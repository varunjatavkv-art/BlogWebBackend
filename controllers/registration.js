import bcrypt from "bcrypt";
import User from "../models/Users.js";

export const registration =  async(req,res) => {
    try {
        const {name, email, mobile, username, password} = req.body;

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        console.log(hashedPassword);
        
        const user = await User({
            Name: name,
            Email:email,
            Mobile: mobile,
            UserName: username,
            Password: hashedPassword
        });

        console.log(user);
        

        await user.save();
        return res.status(201).json({message: "User has been created Successfully !!", data: user});
    } catch (error) {
        console.log(error);
        
        res.status(404).json({error: "Error in registraion" , message: error.message})
    }
}