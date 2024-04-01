import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createPost = async(req, res, next)=>{
    try {
       const {postedBy, text, img} = req.body;
        if(!postedBy || !text){
           return next(errorHandler(400,"PostedBy and text fields are required"));
        }

        const user = await User.findById(postedBy);
        if(!user){
           return next(errorHandler(404, "user not found"));
        }

        if(user._id.toString() !== req.user.id.toString()){
            next(errorHandler(400, "Unauthorized to create post"));
        }

        if(text.length > 500){
            next(errorHandler(400, "Text must be less than 500 characters"));
        }

        const newPost = new Post({postedBy, text, img});
        await newPost.save();
        res.status(201).json({message: "Post created successfully"});
    } catch (error) {
        next(error);
    }
};