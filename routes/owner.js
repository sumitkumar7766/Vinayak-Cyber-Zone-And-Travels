const express = require('express');
const router = express.Router();
const Owner = require("../models/owner.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const ownerCentroller = require("../controllers/owner.js");
const listingconterol = require("../controllers/listing.js")
const sublistingcentriol = require("../controllers/sublisting.js")
const { isLoggedIn, isLoggedInOwner  } = require("../middleware.js");

const { ownerSchema } = require("../schema.js");
const { connect } = require('mongoose');

const validateowner = (req, res, next) => {
    let { error } = ownerSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    };
};

// //delet Listing
// router.delete("/listing/:id", listingconterol.deleteListing);

router.get('/', wrapAsync(async (req, res) => {
    res.render("user/index");
}));


//agent login
router.get("/agentloginpage", wrapAsync(async(req, res) => {
    res.render("owner/agentlogin");
}));

router.get("/admin", isLoggedInOwner, ownerCentroller.index );

//add Listing
router.get("/addlisting", isLoggedInOwner,  wrapAsync(async(req, res) => {
    res.render("owner/newlistings")
}));

router.post("/addlisting", isLoggedInOwner,  listingconterol.addListing);

router.get("/listing/:id", isLoggedInOwner,  listingconterol.showListings);


//add subListing
router.post("/addlisting/:id/sublisting", isLoggedInOwner, sublistingcentriol.addSublisting);


//match of agent id and password
router.post("/agentlogin", passport.authenticate("local", { failureRedirect: "agentloginpage", failureFlash: true }), ownerCentroller.loginpostowner);

//logout
router.get("/logout", isLoggedInOwner, ownerCentroller.logout );


module.exports = router;