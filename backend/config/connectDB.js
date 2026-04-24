const mongoose = require("mongoose");


const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/nodetake", {
            maxPoolSize: 10,
            minPoolSize: 5,
            maxIdleTimeMS: 30000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB connected successfully");
        return true;
    } catch(error){
        console.error("Error connecting to MongoDB:", error);
        return false;
    }
}

module.exports = connectDB;