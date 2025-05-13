const{register,login,logout,getuserdetails,verifyEmail} =require("../controller/user.js");
const {isauthenticated}=require("../middleware/auth.js");

const express=require("express");
const router=express.Router();
router.post("/verifyemail",verifyEmail);
router.post("/register",register);
router.post("/login",login);
router.get("/me",isauthenticated,getuserdetails);
// router.post("/adminlogin",adminlogin);
module.exports=router;
