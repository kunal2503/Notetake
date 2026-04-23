const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRouter = require("./router/authRouter");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended :  true}));

connectDB();

app.use("/auth/v1",authRouter);

app.get("/",(req,res)=>{
    console.log("Hello from root.");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
