const express = require("express");
const Userroute = express.Router();

const {Homepage,getmyAccount,proposal,items,
fillProposalPage,makeProposal,clientPage,getProposal} = require("../controller/User_controller");
const {Authgurd} = require("../middleware/Auth");
const {offerForm,checkOfferFormValidation} = require("../middleware/offerForm_validation");


const {uploadFile} = require("../middleware/fileupload_validation")

Userroute.get("/myacc",Authgurd,getmyAccount);

Userroute.get("/user/proposal",Authgurd,proposal);

Userroute.get("/item/:itemno/:stage",Authgurd,items);

Userroute.get("/item/:propitems",Authgurd,fillProposalPage);

Userroute.post("/proposal",Authgurd,uploadFile,offerForm,checkOfferFormValidation,makeProposal);

Userroute.get("/proposals",Authgurd,clientPage);

Userroute.get("/getproposal",Authgurd,getProposal);


module.exports ={
    Userroute
}