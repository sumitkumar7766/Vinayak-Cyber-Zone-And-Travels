const Sublisting = require("../models/sublisting.js");
const Listing = require("../models/listing.js");
const express = require('express');
const router = express.Router();
const passport = require("passport");
const userCentroller = require("../controllers/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");

const { userSchema } = require("../schema.js");
const listing = require("../models/listing.js");

module.exports.addSublisting = wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    let newSublists = new Sublisting(req.body.sublisting);

    listing.sublisting.push(newSublists);

    await newSublists.save();
    await listing.save();
    req.flash("success", "Your List Added Successfully");
    res.redirect(`/owner/listing/${listing._id}`);
})

module.exports.renderSublistingForm = wrapAsync(async (req, res) => {
    res.render("owner/addSublisting.ejs");
})

module.exports.showSublistbyclick = wrapAsync(async (req, res) => {
    res.render("owner/show.ejs");
})
