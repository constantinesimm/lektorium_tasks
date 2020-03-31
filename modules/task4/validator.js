const Joi = require('joi');
const createError = require('http-errors');

const schemas = {
    first: Joi.object().keys(),
    second: Joi.object().keys(),
    third: Joi.object().keys()
};

const validator = (schema, property) => {
    return (req, res, next) => {
        const { error } = Joi.validate(req[property], schema);
        const valid = error === null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            next(createError(400, `FIELD_VALIDATION ${ message }`));
        }
    }
};

module.exports = { schemas, validator };
