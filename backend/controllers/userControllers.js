const User = require("../model/user");



const getUserInfo = async(req,res) =>{
    try{
        const userId = req.user;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        res.status(200).json({user});
    } catch(error){
        res.status(500).json({message : "internal server error"});
    }
}