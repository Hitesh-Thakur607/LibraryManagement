// const jwt=  require("jsonwebtoken");
// const sendcookie = (user, res, message, statusCode) => {
//     const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET,
//     {
//         expiresIn: "1h",
//     });
//     // console.log("Token sent to client:", token);

//     res.cookie("token", token, {
//         httpOnly: true,
//         // secure: process.env.NODE_ENV === "production",
//         secure:true,
//         sameSite: "none",
//         maxAge: 3600000, 
//     });

//     res.status(statusCode).json({
//         success: true,
//         message,
//         user,
//     });
// };

// module.exports = { sendcookie };
const jwt = require("jsonwebtoken");

const sendcookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.role === "admin" }, // 👈 include admin info
    process.env.JWT_SECRET
  );

  res.status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.role === "admin" // 👈 frontend will also get this info
      }
    });
};

module.exports = { sendcookie };
