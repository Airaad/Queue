import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost, deletePost, getFeedPost, getPost, likeUnlikePost, replyToPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create',verifyToken, createPost);
router.get('/getpost/:id',getPost);
router.delete('/deletepost/:id',verifyToken, deletePost);
router.post('/like/:id', verifyToken, likeUnlikePost);
router.post('/reply/:id', verifyToken, replyToPost);
router.get('/feed', verifyToken, getFeedPost);

export default router;