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
    role:{
        type:String,
        default:"Employee"
    },
    password:{
        type:String,
        required:true
    },
    proposalId:[
        {
            ref:"client",
            type:mongoose.Types.ObjectId
        }
    ]
})

const User = new mongoose.model("user",userModel);

module.exports = {
    User
}