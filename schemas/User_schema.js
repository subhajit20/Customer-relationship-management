const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const User = new mongoose.model("user",userModel);

module.exports = {
    User
}