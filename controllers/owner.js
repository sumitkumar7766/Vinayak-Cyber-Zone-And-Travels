const express = require('express');
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");


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