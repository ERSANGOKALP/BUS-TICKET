const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req,res)=> {
    try {
        const hash = bcrypt.hashSync(req.body.password ,5 );
        const newUser = new User({            
            ...req.body,
            password:hash
        });

        await newUser.save();
        res.status(201).json("User has been created!");
    } catch (err) {
        res.status(500).json({
            error:err,
            message:'Something went wrong!'
        })
    }
}

const login = async (req,res)=> {
    try {
        const {email } = req.body;
         const user =await User.findOne({email:req.body.email})
         if(!email) return res.status(404).json("User not found!");

         const isCorrect = bcrypt.compareSync(req.body.password, user.password)
         if(!isCorrect) return res.status(400).json("Wrong password or email!");
         
         const accessToken = jwt.sign({
            id:user._id,
         },
         process.env.JWT_SEC,
         {expiresIn:"3d"}
         );
         
         const {password, ...others} = user._doc; 

         res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json({            
            message:'Something went wrong!'
        })
    }
}

module.exports = {
    register,
    login,
}