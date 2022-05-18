/**************** External Imports******************************/
const { check, validationResult } = require("express-validator");


const offerForm = [
    check("address")
        .isLength({ min: 5 })
        .withMessage("Your usename must be atleast 3 letter")
        .toLowerCase()
        .trim(),
    check("fname")
        .isLength({ min: 3 })
        .withMessage("Your usename must be atleast 3 letter")
        .trim(),
    check("lname")
        .isLength({ min: 2 })
        .withMessage("Your usename must be atleast 3 letter")
        .trim(),
    check("zip")
        .isLength({ min: 4 })
        .withMessage("Your usename must be atleast 3 letter")
        .trim(),
    check("country")
        .isLength({ min: 4 })
        .withMessage("Your usename must be atleast 3 letter")
        .trim(),
    check("phone_number")
        .isMobilePhone()
        .isNumeric()
        .withMessage("Your mobile number should be numaric value").trim(),
    check("proposar_email")
        .isEmail()
        .trim()
];

function checkOfferFormValidation(req, res, next) {
    const errors = validationResult(req);
    const mappederror = errors.mapped();

    if (Object.keys(mappederror).length === 0) {
        next();
    } else if (Object.keys(mappederror).length > 0) {
        res.status(500).json({
            errors: mappederror
        })
    }
}

module.exports = {
    offerForm, checkOfferFormValidation
}
