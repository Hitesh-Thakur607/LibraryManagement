const jwt=  require("jsonwebtoken");
const sendcookie = (user, res, message, statusCode) => {
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET,
    {
        expiresIn: "1h",
    });
    // console.log("Token sent to client:", token);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, 
    });

    res.status(statusCode).json({
        success: true,
        message,
        user,
    });
};

module.exports = { sendcookie };