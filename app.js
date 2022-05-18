require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const cookiParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;

/************  Internal imports ***********/
const {loginRoute} = require("./routes/Login_route");
const {signupRoute} = require("./routes/Signup_route");
const {Userroute} = require("./routes/User_route");
const {logoutRoute} = require("./routes/logout_route");

const publicDir = path.join(__dirname,"/public");

/* Parsers declared */
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cookiParser(process.env.COOKIE_SECRET))
app.set("view engine","ejs");
app.set("views","./views")

/******************* Mongodb atlash connection *******************/
mongoose.connect(process.env.MONGO_CONNECTION_URI)
.then(()=>{
    console.log("Database is succefully  connected...");
}).catch(()=>{
    console.log("Database is not succefully  connected...")
})

app.use(loginRoute);
app.use(signupRoute);
app.use(Userroute);
app.use(logoutRoute);

app.get("*",(req,res)=>{
    res.status(404).render("error_page",{
        title:"Not Found 404!"
    })
})


/************ Server is listening ********************/
app.listen(PORT,()=>{
    console.log("Server is running at http://localhost:3000");
})