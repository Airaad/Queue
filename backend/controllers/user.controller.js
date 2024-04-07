import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import mongoose from "mongoose";

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 5 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          bio: req.body.bio,
        },
      },
      { new: true } //it will give the updated document from database
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = async(req, res, next)=>{
  try {
    res.clearCookie("access_token").status(200).json("User has been signed out")
  } catch (error) {
    next(error);
  }
};


export const followUnFollowUser = async(req, res, next)=>{
  try {
    const id = req.params.id;
    const userToFllowOrUnfollow = await User.findById(id);
    const currentUser = await User.findById(req.user.id);
    if(id === req.user.id){
      return next(errorHandler(404,"You cannot follow/unfollow yourself"));
    }
    if(!userToFllowOrUnfollow || !currentUser){
      return next(errorHandler(400, "User not found"));
    }

    const isFollowing = currentUser.following.includes(id); //to check whether the user is following the given id or not

    if(isFollowing){
      //Unfollow the user
      //Modify the current users following, and also modify the followers of userToFollowOrUnfollow
      //we will be using pull operator of mongodb
      await User.findByIdAndUpdate(req.user.id, {$pull: {following: id}});
      await User.findByIdAndUpdate(id, {$pull: {followers: req.user.id}});
      res.status(200).json({message: "User Unfollowed Successfully"});
    }else{
      //Follow the user
      //we will be using push operator of mongodb
      await User.findByIdAndUpdate(req.user.id, {$push: {following: id}});
      await User.findByIdAndUpdate(id, {$push: {followers: req.user.id}});
      res.status(200).json({message: "User followed Successfully"});
    }
  } catch (error) {
    next(error);
  }
};


export const getUserProfile = async(req, res, next)=>{
  const {query} = req.params; //query can be either username or _id
  try {
    let user;

    //query is userId
    if(mongoose.Types.ObjectId.isValid(query)){
      user = await User.findOne({_id: query}).select("-password").select("-updatedAt");
    }else{
      //query is username
      user = await User.findOne({username: query}).select("-password").select("-updatedAt"); //excluding password and updatedAt fields

    }

    if(!user){
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};