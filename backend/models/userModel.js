const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First NAME IS REQUIRED'],
        minlength: [4, 'First NAME IS TOO SHORT'],
        maxlength: [20, 'First NAME IS TOO LONG']
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        minlength: [4, 'LAST NAME IS TOO SHORT'],
        maxlength: [20, 'LAST NAME IS TOO LONG'],
        
    },
     email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Please add a valid Email']
     },
    password:{
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password is too short, it must have at least 6 characters'],
        maxlength: [20, 'Password is too long']
    },

    role: {
        type:Number,
        default:0
    }
        

     
}, {timestamps:true});


//encrypting password

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//return a JWT Token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, 
        {expiresIn: '1h'});
}




module.exports = mongoose.model("User", userSchema);
