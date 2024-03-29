import express from "express";
import { test } from "../controllers/user.controller.js";

//express.Router() is a class in the Express.js framework for Node.js that allows you to create modular, mountable route handlers. In simpler terms, it helps you organize your routes into separate files or modules, making your codebase more maintainable and scalable.
const router = express.Router();

router.get('/test', test);

export default router;