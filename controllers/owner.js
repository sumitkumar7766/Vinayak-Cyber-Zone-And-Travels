const User = require("../models/user.js");
const Owner = require("../models/owner.js");
const express = require('express');
const router = express.Router();
const passport = require("passport");
const userCentroller = require("../controllers/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");



const { userSchema } = require("../schema.js");

module.exports.loginpostowner = async (req, res) => {
    req.flash("success", "Hii, Sir Welcome to Vinayak Cyber Zone and Travels");
    let redirectUrl = res.locals.redirectUrl || "admin";
    res.redirect(redirectUrl);
};

module.exports.index = wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    await res.render("owner/admin", { allListings });
});

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Loged Out!");
        res.redirect("/");
    })
};