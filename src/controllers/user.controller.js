const User = require("../models/user.model")

const updateUser = async (req,res) => {
    if(req.body.password){
        req.body.password = bcrypt.compareSync(req.body.password, user.password)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {new:true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteUser = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports= {
    updateUser,
    deleteUser
}