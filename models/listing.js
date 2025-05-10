const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listenSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Owner",
    },
    sublisting: [
        {
            type: Schema.Types.ObjectId,
            ref: "SubListing"

        }
    ],
});

module.exports = mongoose.model("Listing", listenSchema);