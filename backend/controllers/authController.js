
const User = require("../models/userModel");

const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next)=>{

   const {email, password} = req.body;
   const UserExist = await User.findOne({email: email});

   if(UserExist){
    return next(new ErrorResponse("Email already registered", 400));
   }
   try {
    const user = await User.create(req.body);
    res.status(201).json({
        success: true,
        user
    })
   } catch (error) {
    next (error);
   }
}

//Sign In controller

exports.signin = async (req, res, next)=>{

    try {
     
    const {email, password} = req.body;
    
    if(!email){
     return next(new ErrorResponse("Please add an Email", 403));
    }
    if(!password){
        return next(new ErrorResponse("Please add a Password", 403));
       }

       //check user email
       const user = await User.findOne({email: email});
       if(!user){
        return next(new ErrorResponse("Invalid Email", 400));
       }

       //check password
       const isMatched = await user.comparePassword(password);
       if(!isMatched){
        return next(new ErrorResponse("Invalid password", 400));
       }

       sendTokenResponse(user, 200, res);

    } catch (error) {
     next (error);
    }
 }

 const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
    .cookie('token', token, {maxAge: 60*60*1000, httpOnly: true})
    .json({success: true, token, user })
 }

 //log out

 exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Successfully logged out"
    })
 }