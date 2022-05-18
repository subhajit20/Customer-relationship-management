const createError = require("http-errors")

function logout(req,res,next){
    try{
        res.clearCookie("SUNSOLAR");
        res.clearCookie("EMPLOYEE");
        res.status(200).redirect("/")
    }catch(err){
        next(createError("Invalid credentialss"))
    }
}

module.exports ={
    logout
}