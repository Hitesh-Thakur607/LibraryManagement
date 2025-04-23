const{register,login,logout} =require("../controller/user.js");
const express=require("express");
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
// router.post("/adminlogin",adminlogin);
module.exports=router;
