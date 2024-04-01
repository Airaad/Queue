import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
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
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    followers:{
        type: [String],
        default: [],
    },
    following:{
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: "",
    }
}, {timestamps: true} //This is going to save the additional information about the time of creation of this user
);

const User = mongoose.model("User", userSchema);

export default User;