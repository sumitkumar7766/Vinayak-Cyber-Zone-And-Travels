const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const shopstockcontrol = require("../controllers/shopstock.js");
const { isLoggedIn, isLoggedInOwner } = require("../middleware.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const { route } = require('./owner.js');
const upload = multer({ storage });

router.get("/owner/listing", isLoggedInOwner, shopstockcontrol.showshopdata);
router.get("/addproductform", isLoggedInOwner, shopstockcontrol.renderform );

//add listing
router.post("/owner/listing", isLoggedInOwner, upload.single('shopstock[image]'), shopstockcontrol.addlisting);
router.get("/listings/:id", isLoggedInOwner, shopstockcontrol.showlistings);
router.delete("/listings/:id", isLoggedInOwner, shopstockcontrol.deletlistingproduct)

module.exports = router;