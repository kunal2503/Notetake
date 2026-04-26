const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user")


const signin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "All field are required"});
        }
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message : "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,userExist.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid credentials"});
        }
        const token = jwt.sign({id : userExist._id},"kunalkd",{expiresIn : "1d"});

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                username: userExist.username,
                email: userExist.email
            }
        });
    } catch(error){
        res.status(500).json({message :"Internal server error"});
    }
}

const signup = async(req,res)=>{
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({message : "User already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const saltedPassword = await bcrypt.hash(password,salt);

        const newUser =  await User.create({
            username : username,
            email : email,
            password : saltedPassword
        });

        const token = jwt.sign({id : newUser._id},"kunalkd",{expiresIn : "1d"});

        res.status(200).json({
            message: "New account created",
            token: token,
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch(error){
        res.status(500).json({message :"Internal server error"});
    }
}

module.exports = {signin,signup}