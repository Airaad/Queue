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
        res.status(201).json({message: "Post created successfully", newPost});
    } catch (error) {
        next(error);
    }
};

export const getPost = async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return next(errorHandler(404, "Post not found"));
        }
        res.status(200).json({post});
    } catch (error) {
        next(error);
    }
};

export const deletePost = async(req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(errorHandler(404, "Post not found"));
    }
    if(post.postedBy.toString() !== req.user.id.toString()){
       return next(errorHandler(401, "Unauthorized to delete post"));
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Post deleted Successfully"});

};

export const likeUnlikePost = async(req, res, next)=>{
    try {
       const {id: postId} = req.params;
       const userId = req.user.id;
       const post = await Post.findById(postId);

       if(!post){
        return next(errorHandler(404, "Post not found"));
       }

       const userLikePost = post.likes.includes(userId);
       if(userLikePost){
        //user already liked the post. so unlike it
        await Post.updateOne({_id:postId}, {$pull: {likes: userId}});
        next(errorHandler(200,"Post unliked sucessfully"));
       }else{
        //like the post
        await Post.updateOne({_id:postId}, {$push: {likes: userId}});
        res.status(200).json({message: "Post liked succesfully"});
       }
    } catch (error) {
        next(error);
    }
};

export const replyToPost = async (req, res, next)=>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        const userProfilePicture = req.user.profilePicture;
        const username = req.user.username;

        if(!text) {
            next(errorHandler(404, "Text field is required"));
        }
        const post = await Post.findById(postId);
        if(!post){
            return next(errorHandler(404, "Post not found"));
        }
        const reply = {userId, text, userProfilePicture, username};
        post.replies.push(reply);
        await post.save();
        res.status(200).json({message: "Reply added succesfully"});
    } catch (error) {
       next(error); 
    }
};

export const getFeedPost = async(req, res, next)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            next(errorHandler(404, "User not found"));
        }
        const following = user.following; //list of people current user is following
        const feedPosts = await Post.find({postedBy:{$in: following}}).sort({createdAt: -1});
        res.status(200).json(feedPosts);


    } catch (error) {
        next(error);
    }
};