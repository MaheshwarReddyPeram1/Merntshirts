const User = require("../models/user")

exports.getUserByid=( req, res, next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err ||!user){
            return res.status(400).json({
                error:"No user found in DB"
            })
        }
        req.profile=user;
        next();
    });
};
exports.getUser = (req,res)=>{
    //TODO: need to come back here
    return res.json(req.profile);
};