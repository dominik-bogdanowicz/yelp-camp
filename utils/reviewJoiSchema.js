const Joi = require('joi');

const reviewJoiSchema = new Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().min(0).max(5).required()
    }).required()
});

module.exports = reviewJoiSchema;