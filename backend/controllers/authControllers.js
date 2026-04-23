const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const signin = (req,res)=>{
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message : "All field required"});
        }
        

    } catch(error){
        res.status(500).json({message :"Internal server error"});
    }
}

const signup = (req,res)=>{
    try{
        
    } catch(error){
        res.status(500).json({message :"Internal server error"});
    }
}

module.exports = {signin,signup}