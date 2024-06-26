import express from "express";
import { deleteUser, followUnFollowUser, getUserProfile, signout, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


//express.Router() is a class in the Express.js framework for Node.js that allows you to create modular, mountable route handlers. In simpler terms, it helps you organize your routes into separate files or modules, making your codebase more maintainable and scalable.
const router = express.Router();

router.get('/test', test);
router.get('/profile/:query', getUserProfile);
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout',signout);
router.post('/follow/:id', verifyToken, followUnFollowUser);
export default router;