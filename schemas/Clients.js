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
    clients:[
        {
            ref:"Client",
            id:mongoose.Types.ObjectId
        }
    ]
})

const Client = new mongoose.model("client",userModel);

module.exports = {
    User
}