const express = require('express');
const router = express.Router();
const Owner = require("../models/owner.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const ownerCentroller = require("../controllers/owner.js");
const listingconterol = require("../controllers/listing.js");
const sublistingcentriol = require("../controllers/sublisting.js");
const { isLoggedIn, isLoggedInOwner } = require("../middleware.js");
const Listing = require("../models/listing.js"); // Corrected spelling
const Sublisting = require("../models/sublisting.js")

const { ownerSchema } = require("../schema.js");
const { connect } = require('mongoose');

router.get("/admin", isLoggedInOwner, listingconterol.index);

router.get("/:id", isLoggedIn, listingconterol.showListings);

router.delete("/:id", isLoggedInOwner, listingconterol.deletListing);

router.get("/sublisting/:id", isLoggedInOwner,  listingconterol.showListings)

router.get("/:id/edit", isLoggedInOwner, listingconterol.renderEditForm);

router.put("/:id", isLoggedInOwner, listingconterol.editListing);

router.get("/agentloginpage", wrapAsync(async(req, res) => {
    res.redirect("owner/agentlogin");
}));

//delet sublisting
router.delete("/sublisting/:id", listingconterol.deletSublisting)

//edit sublisting
router.get("/sublisting/:id/edit", isLoggedInOwner, listingconterol.rendereditsublistingform)
router.put("/sublisting/:id", isLoggedInOwner, listingconterol.savesublistingeditdata)


module.exports = router;
