import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text:{
        type: String,
        maxLength:500
    },

    img:{
        type: String,
    },
    likes:{
        type: Number,
        default: true,
    },
    replies:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text:{
                type: String,
                required: true,
            },
            userProfilePic:{
                type: String,
            },
            username:{
                type: String,
            }

            
        }
    ],
}, {timestamps: true} //This is going to save the additional information about the time of creation of this user
);

const Post = mongoose.model("Post", postSchema);

export default Post;