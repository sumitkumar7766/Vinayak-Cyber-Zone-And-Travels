const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const userCentroller = require("../controllers/user.js");
const passportLocalMongoose = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const userMiddlewere = require("../controllers/user.js");

const { userSchema } = require("../schema.js");

const validateuser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    };
};

router.get('/', wrapAsync(async (req, res) => {
    res.render("user/index");
}));

// Basic route
router.get('/loginpage', wrapAsync(async (req, res) => {
    res.render("user/userlogin.ejs");
}));

router.get('/userhome', isLoggedIn, validateuser,  userMiddlewere.IndexUser);

router.get('/signup', wrapAsync(async (req, res) => {
    res.render("user/signup.ejs");
}));

//add user Account
router.post("/newuser", userCentroller.RegisterUser);

//View User Data
router.get("/viewProfile", isLoggedIn, userCentroller.renderUserData);

//login User
router.post("/login", passport.authenticate("local", { failureRedirect: "loginpage", failureFlash: true }), userCentroller.loginpost);

router.get("/listing/:id", isLoggedIn, userMiddlewere.showListings );

//LogOut User
router.get("/logout", isLoggedIn, userMiddlewere.logout);

//edit User Data
router.get("/:id/edit", isLoggedIn, userMiddlewere.rendereditform)

//userdatasave after edit form render
router.put("/:id", isLoggedIn, userMiddlewere.saveusereditdata)

module.exports = router;