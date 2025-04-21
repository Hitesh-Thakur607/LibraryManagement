const{register,login,getuserdetails,logout} =require("../controller/user.js");
const {isauthenticated}=require("../middleware/auth.js");
const express=require("express");
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/me",isauthenticated,getuserdetails);
router.get("/logout",isauthenticated,logout);
module.exports=router;
