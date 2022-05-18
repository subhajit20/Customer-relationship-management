const express = require("express");
const loginRoute = express.Router();
const {myLoginReq,loginPage} = require("../controller/login_controller");
const {loginvalidate,checkLoginValidation} = require("../middleware/login_validation");
const {uploadFile} = require("../middleware/fileupload_validation");

loginRoute.post("/login",uploadFile,loginvalidate,checkLoginValidation,myLoginReq);

loginRoute.get("/",loginPage);

loginRoute.get('/signature',(req,res)=>{
    res.status(200).render("signature_place")
})


module.exports = {
    loginRoute
}