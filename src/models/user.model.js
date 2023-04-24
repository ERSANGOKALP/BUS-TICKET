const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true 
    },
    age:{
        type:Number,
        required:true,       
    },
    gender:{
        type: String,
        enum: ['Male', 'Female'],
        required: true,        
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    telephone:{
        type:String,
        required:true,
        unique:true        
    },
    password:{
        type:String,
        required:true,        
    }    
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)
