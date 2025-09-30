const express=require("express");
const router = express.Router();
const generateId = () => Math.floor(Math.random() * 1000000);
const {sendcookie}=require("../utils/cookie");
const {users}=require("../Model/user.js");
const nodemailer = require("nodemailer");
// const { SendEmail } = require("../middleware/email.config.js");
// const {admin}=require("../Model/admin.js");
const tempUsers = {}; // In-memory temp store (can replace with Redis etc)

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await users.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const verificationToken = Math.floor(100000 + Math.random() * 900000);

  // Send OTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tv293435@gmail.com",
      pass: "igtf tilt zwykcc",
    },
  });

  try {
    await transporter.sendMail({
      from: `"Library Management" <tv293435@gmail.com>`,
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is ${verificationToken}`,
      html: `<b>Your verification code is ${verificationToken}</b>`,
    });

    // Store in temp (you can use DB with expiration if needed)
    tempUsers[email] = { name, password, verificationToken };
    console.log(tempUsers[email].verificationToken);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send verification email" });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const user = await users.findOne({ email, password }); 
        if (user) {     
            if (!user.isVerified) {
                return res.status(403).json({ message: "Please verify your email before logging in" });
              }
            sendcookie(user, res, `Login successful, ${user.name}`, 201);
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const verifyEmail = async (req, res) => {
    const { email, verificationToken } = req.body;
  
    const tempUser = tempUsers[email];
    if (!tempUser) return res.status(400).json({ message: "No OTP requested for this email" });
  
    if (tempUser.verificationToken == verificationToken) {
      await users.create({
        name: tempUser.name,
        email,
        password: tempUser.password,
        isVerified: true,
      });
  
      delete tempUsers[email]; // Clean up
      return res.status(200).json({ message: "Email verified and user registered" });
    } else {
      return res.status(400).json({ message: "Invalid verification token" });
    }
  };
const getuserdetails = async (req, res) => {
  try {
    const user = await users.findById(req.user.id).populate({
      path: 'booksborrowed',
      select: 'name description'
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// const getuserdetails = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized: No user found" });
//     }

//     const user = await users.findById(req.user.id)
//       .populate({
//         path: 'booksborrowed',
//         select: 'name description', // only fetch name and description
//       });

//     if (!user) {
//       return res.status(404).json({ message: "User not found in DB" });
//     }
//   res.status(200).json({
//       success: true,
//       user: req.user,
//     });
//     // res.status(200).json(user);
//   } catch (error) {
//     console.error("GET /me error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



const logout=async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    });
    return res.status(200).json({message:"Logged out successfully"});
}
module.exports={register,login,logout,getuserdetails,verifyEmail};
// {
//     "name":"kaduwala",
//    "email":"kadulelo@gmai.com",
//     "password":"123456"
// }
// {
//     "name":"kaduwala",
//    "email":"kadulelo@gmai.com",
//     "password":"123456"
// }
