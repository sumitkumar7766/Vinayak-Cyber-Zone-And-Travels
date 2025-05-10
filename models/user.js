const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    fathername: { type: String, required: true },
    mothername: { type: String, required: true },
    mobileno: { type: Number, require: true },
    gram: { type: String, required: true },
    post: { type: String, required: true },
    thana: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },

});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
