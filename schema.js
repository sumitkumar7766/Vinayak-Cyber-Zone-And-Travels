const { name } = require('ejs');
const Joi = require('joi');

module.exports.ownerSchema = Joi.object({
    owner : Joi.object({
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        fathername: Joi.string().required(),
        mothername: Joi.string().required(),
        mobileno: Joi.number().required(),
        mobileno2: Joi.number().required(),
        location: Joi.string().required(),
        LocationCodenate: Joi.string().required(),
    }).required(),
});

module.exports.userSchema = Joi.object({
    user : Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        fathername: Joi.string().required(),
        mothername: Joi.string().required(),
        mobileno: Joi.number().required(),
        gram: Joi.string().required(),
        post: Joi.string().required(),
        thana: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.number().required(),
    }).required(),
})

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().required(),
    })
})