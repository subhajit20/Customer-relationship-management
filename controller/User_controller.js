const { get } = require("express/lib/response");
const { User } = require("../schemas/User_schema");
const { clientModel } = require("../schemas/Clients");
const mongoose = require("mongoose");
const myPath = require("path");

const Client = new mongoose.model("client", clientModel);

/* ----------------- Node Mailer Installation -------------- */
const nodeMailer = require("nodemailer");

/*************Senting emails***********/
const transeport = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "subhajitstd07@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

function Homepage(req, res) {
  try {
    res.status(200).render("Homepage", {
      title: "Homepage",
    });
  } catch (err) {
    res.status(404).redirect("/");
  }
}

async function getmyAccount(req, res) {
  try {
    const getAcc = await User.findOne({ username: req.username }).select({
      id: 0,
      email: 0,
      password: 0,
    });
    if (getAcc) {
      res.status(200).json({
        name: getAcc.username,
        company: getAcc.company,
      });
    } else {
      ResizeObserver.status(500).json({
        err: {
          msg: "NaN",
        },
      });
    }
  } catch (err) {
    res.status(404).redirect("/");
  }
}

function proposal(req, res) {
  res.status(200).render("proposal_page", {
    title: "Proposal",
  });
}

function items(req, res) {
  res.status(200).render("item_page", {
    title: "Items",
  });
}

function fillProposalPage(req, res) {
  res.status(200).render("owner_offer", {
    title: req.params.propitems,
  });
}

const pdfDir = myPath.join(__dirname,"../pdf/sunsolar.pdf");

async function makeProposal(req, res) {
  try {
    const newProposal = new Client({ ...req.body, empId: req.id });
    const saveProp = newProposal.save();
    const savetoEmpId = await User.updateOne(
      { _id: req.id },
      {
        $push: {
          proposalId: newProposal._id,
        },
      }
    );
    const mailOption = {
      from: "subhajitstd07@gmail.com",
      to:newProposal.proposar_email,
      subject: "Thank You So Much",
      html:`<!DOCTYPE html>
              <html>
              <head>
                <title>Hellow World</title>
              </head>
              <body>
              <div>
                <ul>
                  <li>First Name : ${newProposal.fname}</li>
                  <li>Total Fee : ${newProposal.total_fee}</li>
                  <li>Installation Fee : ${newProposal.btw}</li>
                  <li>Vat : ${newProposal.installation_fee}</li>
                </ul>
              </div>
              <div>
                <a href="#" style="text-decoration:none;padding:50px;background-color:"F9D923";color:black;font-size:1.4rem;">Click Here</a>
              </div>
              </body>
              </html>`,
      attachments:[
        {filename:"sunsolar.pdf",path:pdfDir}
      ]
    };
    await transeport.sendMail(mailOption);

    res.status(200).json({
      succes: {
        msg: newProposal,
      },
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: {
        msg: "Proposal is not made...",
      },
    });
  }
}

function clientPage(req, res) {
  try {
    res.status(200).render("client", {
      title: "clients",
    });
  } catch (err) {
    res.status(404).render("error_page", {
      title: "Not Found 404!",
    });
  }
}

/* Get Proposal */
async function getAllProposal(req, res) {
  try {
    const getProps = await Client.find({ empId: req.id }).select({
      address: 0,
      btw: 0,
      country: 0,
      empId: 0,
    });
    res.status(200).json({
      data: getProps,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        mss: "No Proposals are exist...",
      },
    });
  }
}

function getAPropPage(req,res){
  try {
    res.status(200).render("");
  } catch (err) {
    res.status(500).render("error_page")
  }
}

async function getProposal(req, res) {
  try {
    const getProps = await Client.find({ _id: req.params.id });
    res.status(200).json({
      data: getProps,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        mss: "No Proposals are exist...",
      },
    });
  }
}

module.exports = {
  Homepage,
  getmyAccount,
  proposal,
  items,
  fillProposalPage,
  makeProposal,
  clientPage,
  getAllProposal,
  getProposal,
  getAPropPage
};
