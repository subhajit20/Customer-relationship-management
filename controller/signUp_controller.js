const bcrypt= require("bcrypt");

/*********** Internal Imports *************/
const {User} = require("../schemas/User_schema");

async function addUser(req,res){
    try{    
        const {password} = req.body;
        const hased = await bcrypt.hash(password,10)
            const newUser = new User({...req.body,password:hased});
            const savedUser = newUser.save();
            if(savedUser){
                res.json({
                    successfull:{
                        msg:"Account is successfully created"
                    }
                })
            }else{
                    res.json({
                        successfull:{
                            msg:"Account is not successfully created...Fill the form correctly"
                        }
                    })
            }
    }catch(err){
        res.status(500).json({
            msg:"Something Wrong..."
        })
    }
}

function mySignupPage(req,res){
    try{
        res.status(200).render("signup_page",{
            title:"SunSolar - Signup"
        });
    }catch(err){
        res.status(500).render("error_page")
    }
}

module.exports = {
    addUser,mySignupPage
}