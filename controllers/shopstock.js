const Shopstock = require("../models/shopstock.js");
const express = require('express');
const wrapAsync = require("../utils/wrapAsync.js");
const SubListing = require("../models/sublisting.js");


module.exports.showshopdata = wrapAsync(async (req, res) => {
    const allListings = await Shopstock.find({});
    res.render("listings/ownerlistings.ejs", { allListings });
    console.log(allListings);
});

module.exports.renderform = wrapAsync(async(req, res) => {
    res.render("listings/new");
})

module.exports.addlisting = wrapAsync(async(req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "___", filename);
    const newListing = new Shopstock(req.body.shopstock);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("listing");
})

module.exports.showlistings = wrapAsync(async(req, res) => {
    let { id } = req.params;
    const listing = await Shopstock.findById(id).populate("owner");
    if (!listing) {
        req.flash("error", "Listing You requested does not existed");
        res.redirect("/listings");
    } else {
        console.log(listing);
        res.render("listings/show.ejs", { listing });
    }
})

module.exports.deletlistingproduct = wrapAsync(async(req, res) => {
    const { id } = req.params;
    const deletitem = await Shopstock.findByIdAndDelete(id);
    console.log(deletitem);
    req.flash("success", "Listing Deleted!");
    res.redirect("/shopstock/owner/listing");
})