const dotenv = require('dotenv').config()
const { User } = require('../schemas/User_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function myLoginReq(req, res) {
    const findUser = await User.findOne({ username: req.body.username });
        if(findUser.role === "Admin"){
            const token1 = jwt.sign({
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            }, process.env.JWT_TOKEN, {
                expiresIn: "2h"
            })
            res.cookie(process.env.COOKIE_NAME,token1,{
                maxAge:process.env.DEAD,
                httpOnly:true,
                signed:true
            })

            const token2 = jwt.sign({
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            }, process.env.ADMIN_TOKEN, {
                expiresIn: "2h"
            })
            res.cookie(process.env.ADMIN_COOKIE_NAME,token2,{
                maxAge:process.env.ADMIN_COOKIE_END,
                httpOnly:true,
                signed:true
            })
            res.status(200).json({
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            })
        }else if(findUser.role === "Employee"){
            const token1 = jwt.sign({
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            }, process.env.JWT_TOKEN, {
                expiresIn: "2h"
            })
            res.cookie(process.env.COOKIE_NAME,token1,{
                maxAge:process.env.DEAD,
                httpOnly:true,
                signed:true
            })
            res.status(200).json({
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            })
        }
        
}


function loginPage(req,res){
    res.status(200).render("login_page",{
        title:"Sunsolar - Login"
    })
}

module.exports = {
    loginPage,myLoginReq
}