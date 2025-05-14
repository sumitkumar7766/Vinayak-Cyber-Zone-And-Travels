const Review = require('../models/review.js');
const Shopstock = require("../models/shopstock.js");
const wrapAsync = require('../utils/wrapAsync.js');



module.exports.deletereview = async (req, res, next) => {
    let { id, reviewId } = req.params;
    
    await Shopstock.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Reviews Deleted Successfully");
    res.redirect(`/shopstock/listings/${id}`);
};

module.exports.deletereviewuser = async (req, res, next) => {
    let { id, reviewId } = req.params;
    
    await Shopstock.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Reviews Deleted Successfully");
    res.redirect(`/shopstock/user/listings/${id}`);
};

module.exports.addreviewuser = wrapAsync(async(req, res) => { 
    console.log(req.params.id);
    let listing = await Shopstock.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Reviews Added");
    res.redirect(`/shopstock/user/listings/${listing._id}`);
});

module.exports.addreview = wrapAsync(async(req, res) => {
    console.log(req.params.id);
    let listing = await Shopstock.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Reviews Added");
    res.redirect(`/shopstock/listings/${listing._id}`);
});