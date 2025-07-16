const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
const cors=require("cors");
const mongoose=require("mongoose");
const { error } = require("console");
const axios=require("axios");
const userRoutes=require("./routes/routes");

mongoose.connect("mongodb+srv://Books:as816@books.4fwjwy3.mongodb.net/?retryWrites=true&w=majority&appName=Books").then(console.log("Connected to mongodb")).catch(error=>console.error("Couldn't connect"));

app.use(express.json());
app.use(cors());

app.use("/",userRoutes);

app.listen(3000,()=>{console.log("Server is running at 3000")});