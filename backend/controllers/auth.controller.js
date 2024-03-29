import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken"; //for user authentication

export const signup = async (req, res, next)=>{
    const{username, email, password} = req.body;

    //extra security if any of the fields is empty
    if(!username || !email || !password || username === "" || email === "" || password === ""){
       return next(errorHandler(400, "All fields are required")); //using custom error handler because this error is created by us
    }

    const hashPassword = bcryptjs.hashSync(password, 10); //hashSync has await property inside it

    const newUser = new User({
        // username: username,
        // email: email,
        // password: password,
        //in es6 if the key and the value are same we can use it directly
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        res.json("Sucessfull signUp")
    } catch (error) {
        next(error); //using error handler middlewear
    }
    
};

export const signin = async(req, res, next)=>{
    const{email, password} = req.body;

    if(!email || !password || email === "" || password === ""){
       return next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "Wrong credentials"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Wrong credentials"));
        }

        const token = jwt.sign({id: validUser.id}, process.env.JWT_SECRET, /*{expiresIn: "1d"}*/);
        const{password:pass, ...rest} = validUser._doc; // to seperate the password from the token. Now password won't be included in the validUser
        res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
    } catch (error) {
        next(error);
    }
};