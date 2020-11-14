const User = require("../models/user")
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");

exports.signin = (req,res)=>{
    const { email,password } = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error:"Email does not match"
            })
        }
        if(!user.autheticate(password)){
            return res.status(401).json({
                error:'Email or password does not match'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.secret)
        
        res.cookie("token",token,{expire : new Date()+999});

        const {_id,name,email,role} = user
        return res.json({token,user:{_id,name,email,role}})
    })
}

exports.signup =(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:" Not able to save user.."
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
};

exports.signout = (req,res)=>{
    res.clearCookie('token')
    res.json({
        msg:'user signout..'
    })
}

exports.IsSignedIn = expressJwt({
    secret:process.env.secret,
    userProperty:"auth"
})
exports.isAutheticated = (req , res , next) =>{
    console.log(req.profile)
    console.log(req.auth)
    console.log(req.profile._id)
    let checker = req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:'access denied'
        })
    }
    next();
}
exports.isAdmin = (req,res,next) =>{
    if(req.Profile.role == 0){
        return res.status(403).json({
            error:"You are not admin"
        })
    }
    next();
}