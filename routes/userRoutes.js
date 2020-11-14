const express =require("express")
const router = express.Router()
const {IsSignedIn,isAutheticated,isAdmin}= require("../controllers/auth");
const {getUserByid,getUser}= require("../controllers/userRoutes");

router.param("userId",getUserByid);
router.get("/user/:userId",IsSignedIn,isAutheticated,getUser);
module.exports = router;