/**************** External Imports******************************/
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const createError = require("http-errors")
const bcrypt = require("bcrypt");
const { User } = require("../schemas/User_schema");


const loginvalidate = [
    check("username")
        .isLength({ min: 3 })
        .withMessage("Your usename must be atleast 3 letter")
        .toLowerCase()
        .isAlphanumeric()
        .withMessage("Your usename must be in small letter")
        .custom(async (value) => {
            const myUsername = await User.findOne({ username: value });
            if (myUsername) {
                console.log("Username is valid")
            } else {
                throw createError("Invalid Credentials Please try again!");
            }
        }).trim(),

    check("password")
        .isStrongPassword()
        .withMessage(
            "Invalid Credentials Please try again!"
        ).custom(async (value, { req }) => {
            const newUser = await User.findOne({ username: req.body.username });
            if (newUser) {
                const isValid = bcrypt.compare(value, newUser.password);
                if (!isValid) {
                    throw createError("Password is not valid")
                } else {
                    console.log("Password is Valid")
                }
            } else {
                throw createError("Password is not valid")
            }
        })
];

function checkLoginValidation(req, res, next) {
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
    loginvalidate, checkLoginValidation
}
