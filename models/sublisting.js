const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subListingSchema = new Schema({
    name: { type: String, require: true },
    work: { type: String, require: true },
    link: { type: String, require: true },
});

module.exports = mongoose.model("SubListing", subListingSchema);