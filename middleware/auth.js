const jwt = require("jsonwebtoken");
const {users}=require("../Model/user.js");


const isauthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please log in first",
            });
        }
        // console.log("Cookies:", req.cookies);
        // console.log("Authorization header:", req.headers.authorization);
        // console.log("Token:", token);
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
        req.user = await users.findById(decoded._id); // ✅ Corrected here
        // console.log("Decoded JWT:", decoded);
        // console.log("Fetched User:", req.user);
        if (!req.user) {
            console.log("User not found in DB after decoding JWT");
            return res.status(401).json({ success: false, message: "User not found" });
        }
        

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
        });
    }
};

module.exports = { isauthenticated };
