import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps: true} //This is going to save the additional information about the time of creation of this user
);

const User = mongoose.model("User", userSchema);

export default User;