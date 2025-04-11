const sendcookie = (user, res, message, statusCode) => {
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,            // 🔁 Only true in production
        sameSite: isProduction ? "None" : "Lax",  // 🔁 Adjust for local dev
        maxAge: 3600000,
    });

    res.status(statusCode).json({
        success: true,
        message,
        user,
    });
};
