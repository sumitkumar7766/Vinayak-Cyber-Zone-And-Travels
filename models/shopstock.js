const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopstockSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        require: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"

        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Owner",
    },
});

module.exports = mongoose.model("Shopstock", shopstockSchema);