const { request } = require("express");
const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    age:{
        type:Number
       }
},

    {timestamps:true

    
})
// Create Model
const User=mongoose.model('User',userSchema)
module.exports=User;