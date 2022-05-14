const express = require("express");
const signupRoute = express.Router();
const {addUser,mySignupPage} = require("../controller/signUp_controller");
const {uservalidate,checkValidation} = require("../middleware/signup_validation");

signupRoute.post("/signup",uservalidate,checkValidation,addUser);

signupRoute.get("/signup",mySignupPage);

module.exports = {
    signupRoute
}