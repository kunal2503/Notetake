const express = require("express");
const cors = require("cors");


const app = express();

app.get("/",(req,res)=>{
    console.log("Hello from root.");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
