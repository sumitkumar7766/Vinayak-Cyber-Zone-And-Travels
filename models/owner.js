const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ownerSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    fathername: { type: String, required: true },
    mothername: { type: String, required: true },
    mobileno: { type: Number, required: true },
    mobileno2: { type: Number, required: false },
    location: { type: String, required: true },
    LocationCodenate: { type: String, required: false },
});


ownerSchema.plugin(passportLocalMongoose);
const Owner = mongoose.model('Owner', ownerSchema);
module.exports = Owner;
