const ErrorResponse = require("../utils/errorResponse");
const jwt =  require("jsonwebtoken");
const User =  require("../models/userModel");

//check if the user is authenticated

exports.isAuthenticated = async (req, res, next) => {
    const { token} =  req.cookies;

    //Make sure token exists
    if (!token) {
        return next(new ErrorResponse("Not authorized to access ", 401));
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next (new ErrorResponse("Not authorized to access this route", 400));
    }
}

//middleware for admin

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next (new ErrorResponse("Access denied, User must be Admin", 401));
    }
    next();
}

