const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user")

const generateAccessToken = (userId) =>{
    return jwt.sign({id :userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15m"});
}

const generateRefreshToken = (userId) =>{
    return jwt.sign({id :userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn : "30d"});
}




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
        const accessToken = generateAccessToken(userExist._id);
        const refreshToken = generateRefreshToken(userExist._id);

        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict"
        })

        res.status(200).json({
            message: "Login successful",
            accessToken,
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

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict"
        })

        res.status(200).json({
            message: "New account created",
            accessToken,
        });
    } catch(error){
        res.status(500).json({message :"Internal server error"});
    }
}


const signout = async(req,res) =>{
    try{
        const userId = req.user.id;
    
        res.clearCookie("refreshToken",
            {
                httpOnly : true,
                secure : true,
                sameSite : "strict"
            }
        );
        res.status(200).json({message : "Logout successful"});
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}



module.exports = {signin,signup,signout}