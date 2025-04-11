const{register,login,getuserdetails} =require("../controller/user.js");
const express=require("express");
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/me",getuserdetails);
module.exports=router;
