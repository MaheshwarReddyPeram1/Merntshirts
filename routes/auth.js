var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const { min } = require('lodash');
const {signout,signup,signin,IsSignedIn}= require("../controllers/auth");

router.post('/signup',[
    check('name','name should be atleast 3 chars').isLength({min:3}),
    check('password','pass should be atleast 3 chars').isLength({min:3}),
    check('email','invalid email').isEmail()
],signup);

router.post('/signin',[
    check('password','pass should be atleast 3 chars').isLength({min:3}),
    check('email','invalid email').isEmail()
],signin);
router.get('/signout',signout);
router.get('/test',IsSignedIn,(req,res)=>{
    res.json(req.auth);
});
module.exports = router;