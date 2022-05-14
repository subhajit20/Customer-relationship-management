function myLoginPage(req,res){
    try{
        res.status(200).render("login_page",{
            title:"SunSolar - Login"
        });
    }catch(err){
        res.status(500).render("error_page")
    }
}

module.exports = {
    myLoginPage
}