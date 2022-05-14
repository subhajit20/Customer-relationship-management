const express = require("express");
const loginRoute = express.Router();
const {myLoginPage} = require("../controller/login_controller");

loginRoute.get("/",myLoginPage);

module.exports = {
    loginRoute
}