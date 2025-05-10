const Listing = require("../models/listing.js");
const express = require('express');
const router = express.Router();
const passport = require("passport");
const userCentroller = require("../controllers/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const SubListing = require("../models/sublisting.js");

const { userSchema } = require("../schema.js");
const { model } = require("mongoose");

module.exports.index = wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    await res.render("owner/admin", { allListings });
});

module.exports.showListings = wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("sublisting");
    if (!listing) {
        req.flash("error", "Listing You requested does not exist");
        res.redirect("/listings");
    } else {
        console.log(listing);
        res.render("owner/show.ejs", { listing });
    }
});

module.exports.addListing = wrapAsync(async (req, res) => {
    let { title, subtitle, description } = req.body;
    const newListing = new Listing({ title, subtitle, description });
    const registerListing = await Listing.create(newListing);
    console.log(registerListing);
    req.flash("success", "Your List Added Successfully");
    res.redirect("admin");
});

module.exports.deletListing = wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("admin");
});

module.exports.renderEditForm = async(req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("owner/Edit.ejs", {listing});
}

module.exports.editListing = async(req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body});
    res.redirect("admin");
}

module.exports.deletSublisting = wrapAsync(async(req, res) => {
    let { id } = req.params;
    console.log(id);
    await SubListing.findByIdAndDelete(id);
    req.flash("success", "Sublistings Deleted Successfully");
    const parentListing = await Listing.findOne({ sublisting: id });
    res.redirect(`/listing/${parentListing._id}`);

})

module.exports.rendereditsublistingform = wrapAsync(async(req, res) => {
    const { id } = req.params;
    let sublistdata = await SubListing.findById(id);
    res.render("owner/editsublisting", { sublistdata });
})

module.exports.savesublistingeditdata = wrapAsync(async(req, res) => {
    const { id } = req.params;
    await SubListing.findByIdAndUpdate(id, { ...req.body });
    const listing = await Listing.findOne({ sublisting: id }).populate("sublisting");
    res.render("owner/show.ejs", { listing });
})