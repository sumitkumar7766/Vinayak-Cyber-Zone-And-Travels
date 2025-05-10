const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingconterol = require("../controllers/listing.js");
const { isLoggedIn, isLoggedInOwner } = require("../middleware.js");


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
