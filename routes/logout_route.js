const express = require("express");
const logoutRoute = express.Router();

const {logout} = require("../controller/Logout");

logoutRoute.get("/logout",logout);

module.exports={
    logoutRoute
}