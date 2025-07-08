//routes.js
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const enquiry=require("../models/model");
const Task=require("../models/Task");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")


router.post("/",async (req,res)=>{
    const {name,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10)
    const newEnquiry=new enquiry({
        name,
        email,
        password:hashedPassword
    });
    await newEnquiry.save();
    const data=await enquiry.find();
    console.log(data,data.length);
    res.status(200).json({message:"Enquiry Saved successfully"});
})

//$2b$10$YI10H01iiubXUH2xybP9zez1DvYH4u2NPYnlRTkNxE6rlhWzvZAPu
//

router.post("/login", async(req,res)=>{
    const {email,password}=req.body
    const dbresult =await enquiry.findOne({email});
    if(!dbresult){
        return res.json({emailMessage:"User not found"});
    }
    else{
        const isMatch=await bcrypt.compare(password,dbresult.password);
        if(!isMatch){
            return res.json({passwordMessage: "Wrong Password" });
        }
        else{
            const fullData={dbresult,isMatch}
            res.json({ message:"Login successful",fullData});
        }
        }
})

router.post("/TaskPage",async(req,res)=>{
    const {title,description,lastDate,status,userId}=req.body
    try{
        // console.log(title,description,lastDate,status,userId)
        const task=new Task({
            userId,
            title,
            description,
            lastDate,
            status
        });
        // console.log(task.userId);
        await task.save();
        res.status(200).json({message:"Task saved Successfully",task});
    } catch(error){
        res.status(404).json({message:"Task connot saved"})
    }

})


router.get("/TaskPage",async(req,res)=>{
    const userId=req.body;
    console.log(userId)
    const taskData=await Task.find();
    res.json({taskData})
})

router.delete("/TaskPage/:id",async(req,res)=>{
    const {id}=req.params;
    const del=await Task.deleteOne({_id:id})
    res.status(200).json({message:"Deleted"})
})


router.post("/TaskPage/status",async(req,res)=>{
    const {status,id}=req.body;
    const setStatus=await Task.updateOne({_id:id},{status:status})
    const getStatus=await Task.findOne({_id:id});
    let stat=getStatus.status
    console.log(stat)
    res.status(200).json({status:stat})
})

module.exports=router