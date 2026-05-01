const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    console.log("Auth Header:", authHeader); // Debugging line
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message : "unauthorized"});
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,"kunalkd");
        console.log("Decoded Token:", decoded); // Debugging line
        req.user = decoded.id;
        next();
    } catch(error){
        res.status(401).json({message : "Invalid token"});
    }
}

module.exports = authMiddleware;