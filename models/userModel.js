import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "admin", "officer"],
        default: "user"
    },
    code:{
        type: Number,
        default: "000000"
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;