import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    Name:{
        type:String, required: true
    },
    Email: {
        type:String, reequired: true
    },
    Mobile:{
        type: String, required: true
    },
    UserName: {
        type: String, required: true
    },
    Password: {
        type: String, required: true
    },
    UserRole: {
        type: String, required: true, default: '0' , enum: ['0','1']
    }
});

module.exports = mongoose.Model("User", UserSchema);