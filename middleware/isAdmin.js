const jwt = require("jsonwebtoken");
const {users}=require("../Model/user.js");

const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findById(decoded._id); // 🛠 fix model name if needed

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error in admin check" });
  }
};

module.exports = {isAdmin};
