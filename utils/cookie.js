// const sendcookie = (user, res, message, statusCode) => {
//     const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//     });

//     const isProduction = process.env.NODE_ENV === "production";

//     res.cookie("token", token, {
//         httpOnly: true,
//         secure: isProduction,            // 🔁 Only true in production
//         sameSite: isProduction ? "None" : "Lax",  // 🔁 Adjust for local dev
//         maxAge: 3600000,
//     });

//     res.status(statusCode).json({
//         success: true,
//         message,
//         user,
//     });
// };
import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, statusCode = 200) => {
  const secretKey = process.env.JWT_SECRET || "default_secret_key";

  // Ensure JWT_SECRET is properly used
  if (!secretKey) {
    console.error("JWT_SECRET is missing. Check your environment variables.");
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  // Generate token
  const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "15m" });

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "Lax" : "None",
    secure: process.env.NODE_ENV !== "DEVELOPMENT",
  });

  // Send response
  res.status(statusCode).json({
    success: true,
    message,
    token, // Optional for debugging
  });
};
