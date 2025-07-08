//Task.js
const mongoose=require("mongoose");

const TaskSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Entry"
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    lastDate:String,
    status:{
        type:String,
        default:"Pending"
    }
})

module.exports=mongoose.model("Task",TaskSchema);