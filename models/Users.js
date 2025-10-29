import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
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
        type: String, required: true, default: '1' , enum: ['0','1']
    }
});

const User = mongoose.model("User", UserSchema);

export default User;