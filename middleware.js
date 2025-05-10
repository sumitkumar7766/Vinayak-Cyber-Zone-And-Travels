const Listing = require("./models/listing");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");




module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged to access This Page");
        return res.redirect("loginpage");
    }
    next();
};

module.exports.isLoggedInOwner = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Redirect URL
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to access this page");
        return res.redirect("agentloginpage");
    }
    next();
};


