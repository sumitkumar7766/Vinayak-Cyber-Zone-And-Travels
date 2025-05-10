const User = require("../models/user.js");
const express = require('express');
const router = express.Router();
const passport = require("passport");
const userCentroller = require("../controllers/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

const { userSchema } = require("../schema.js");

module.exports.loginpost = async (req, res) => {
    req.flash("success", "Welcome to Vinayak Cyber Zone and Travels");
    let redirectUrl = res.locals.redirectUrl || "userhome"
    res.redirect(redirectUrl);
};

module.exports.RegisterUser = wrapAsync(async (req, res) => {
    let { username, email, password, name, fathername, mothername, gram, post, thana, city, state, country, pincode, mobileno } = req.body;
    const newUser = new User({ email, username, name, fathername, mothername, gram, post, thana, city, state, country, pincode, mobileno });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "You have registered successfully. Please Enter your username and password for Login.");
    res.redirect("loginpage");

});

module.exports.IndexUser = wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    const userdata = await User.findById(req.user._id);
    res.render("user/userhome", { allListings, userdata });
})

module.exports.showListings = wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("sublisting");
    if (!listing) {
        req.flash("error", "Listing You requested does not exist");
        res.redirect("/listings");
    } else {
        console.log(listing);
        res.render("user/usershow.ejs", { listing });
    }
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

module.exports.renderUserData = wrapAsync(async (req, res) => {
    const userdata = await User.findById(req.user._id);
    console.log(userdata);
    res.render("user/userdata.ejs", { userdata });
});

module.exports.rendereditform = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userdataupdate = await User.findById(id);
    res.render("user/userdataeditform.ejs", { userdataupdate });
})

module.exports.saveusereditdata = wrapAsync(async (req, res) => {
    const { id } = req.params;
    let userupdatedata = await User.findByIdAndUpdate(id, {...req.body});
    console.log(userupdatedata);
    res.redirect("viewProfile");
})