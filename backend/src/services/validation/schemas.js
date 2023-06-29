const Joi = require('joi');

const validateName = Joi.object({
    name: Joi.required(),
});

const validateMinName = Joi.object({
    name: Joi.string().min(5).required(),
});

module.exports = {
    validateName,
    validateMinName,
};