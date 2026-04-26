const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRouter = require("./router/authRouter");
const noteRouter = require("./router/noteRouter");


const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","DELETE"],
    allowedHeaders : ["Content-Type","Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({extended :  true}));

// Start server only after DB connection
const startServer = async () => {
    const isConnected = await connectDB();
    if (!isConnected) {
        console.error("Failed to connect to MongoDB. Exiting...");
        process.exit(1);
    }
    
    app.use("/api/v1",authRouter);
    app.use("/api/v1",noteRouter);
    
    app.get("/",(req,res)=>{
        console.log("Hello from root.")
    })
    
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};

startServer();
