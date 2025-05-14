const express = require('express');
const router = express.Router({ mergeParams: true })
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require('../models/review.js');
const { isLoggedIn, isLoggedInOwner } = require("../middleware.js");
const reviewCentroller = require("../controllers/review.js");

//add review Routes
router.post("/", isLoggedIn, reviewCentroller.addreview);
router.post("/user", isLoggedIn, reviewCentroller.addreviewuser);

//delet revires
router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewCentroller.deletereview));
router.delete("/user/:reviewId", isLoggedIn, wrapAsync(reviewCentroller.deletereviewuser));

module.exports = router;