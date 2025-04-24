const{register,login,logout,getuserdetails} =require("../controller/user.js");
const {isauthenticated}=require("../middleware/auth.js");

const express=require("express");
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/me",isauthenticated,getuserdetails);
// router.post("/adminlogin",adminlogin);
module.exports=router;
