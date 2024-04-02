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
        //Likes will be the array of user ids that like the post
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
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
            userProfilePicture:{
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