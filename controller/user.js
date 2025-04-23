// const express=require("express");
// const router = express.Router();
// const generateId = () => Math.floor(Math.random() * 1000000);
// const {sendcookie}=require("../utils/cookie");
// const {users}=require("../Model/user.js");
// const register=async(req,res)=>{
//     const { name, email, password } = req.body;
//     let user = await users.findOne({ email });

//     if (user) return res.status(400).json("User already exists");

//     // const hashedPassword = await bcrypt.hash(password, 10);
//     user = await users.create({ name, email, password});
//     return res.status(200).json({message:"User registered successfully"});
// }
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         // Find the user with matching email and password
//         const user = await users.findOne({ email, password }); // Mongoose method

//         if (user) {
//             sendcookie(user, res, `Login successful, ${user.name}`, 201);
//         } else {
//             res.status(400).json({ message: "Invalid credentials" });
//         }
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
//  const getuserdetails = (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: No user found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: req.user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const logout=async(req,res)=>{
//     res.cookie("token",null,{
//         expires:new Date(Date.now()),
//         httpOnly:true,
//         secure:true,
//         sameSite:"none"
//     });
//     return res.status(200).json({message:"Logged out successfully"});
// }
// module.exports={register,login,getuserdetails,logout};
// // {
// //     "name":"kaduwala",
// //    "email":"kadulelo@gmai.com",
// //     "password":"123456"
// // }
const express=require("express");
const router = express.Router();
const generateId = () => Math.floor(Math.random() * 1000000);
const {sendcookie}=require("../utils/cookie");
const {users}=require("../Model/user.js");
const {admin}=require("../Model/admin.js");
const register=async(req,res)=>{
    const { name, email, password } = req.body;
    let user = await users.findOne({ email });

    if (user) return res.status(400).json("User already exists");

    user = await users.create({ name, email, password});
    return res.status(200).json({message:"User registered successfully"});
}
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const user = await users.findOne({ email, password }); 

        if (user) {
            sendcookie(user, res, `Login successful, ${user.name}`, 201);
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const adminlogin=async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const adminx = await admin.findOne({ email, password });
        if (adminx) {
            sendcookie(adminx, res, `Login successful, ${adminx.name}`, 201);
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const logout=async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    });
    return res.status(200).json({message:"Logged out successfully"});
}
module.exports={register,login,logout,adminlogin};
// {
//     "name":"kaduwala",
//    "email":"kadulelo@gmai.com",
//     "password":"123456"
// }
