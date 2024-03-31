import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";


const app = express();
const port = 3000;
app.use(cookieParser()); // to get the cookie from the browser. will be used for authenticatin user
dotenv.config();

app.use(express.json()), // will allow us to take json as an input to our backend

mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connection Sucessfull");
    }).catch((err)=>{
        console.log(err);
    });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);


//middlewear to handle the errors
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500; //it will give the status code that comes from the err if not then status code will be 500
    const message = err.message || "Internal Server Error"; //error message from the err
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})