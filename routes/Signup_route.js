const express = require("express");
const signupRoute = express.Router();
const {addUser,mySignupPage} = require("../controller/signUp_controller");
const {uservalidate,checkValidation} = require("../middleware/signup_validation");
const {uploadFile} = require("../middleware/fileupload_validation");

const {AdminAuthGurd} = require("../middleware/Auth");


signupRoute.post("/signupreq",AdminAuthGurd,uploadFile,uservalidate,checkValidation,addUser);

signupRoute.get("/signup",AdminAuthGurd,mySignupPage);

module.exports = {
    signupRoute
}