import User from "../models/User.js";
import bcrypt, { hash } from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const login = async (req,res,next)=>{
    
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,'user not found'))
        const ispassword = await bcrypt.compare(req.body.password,user.password)
        if(!ispassword) return next(createError(400,'wrong password or username!')) 
        const {password,isAdmin,...otherdetails} = user._doc;
        const token = jwt.sign({id:user._id,isAdmin: user.isAdmin},process.env.JWT)
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({...otherdetails})
    }catch(err){
        next(err)
    }
}

export const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hash,
        })
        await newuser.save();
        res.status(200).send("user has been created")    
    }catch(err){
        next(err)
    }
}