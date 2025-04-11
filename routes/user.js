const{register,login,getuserdetails} =require("../controller/user.js");
const express=require("express");
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/me",getuserdetails);
module.exports=router;
