const Ajv = require('ajv');
const { personalInfoV1Schema, personalInfoV2Schema, evolutionHobbiesSchema } = require('./schemas');
const ajv = new Ajv();
const handlerError = require('../middleware/errors');

const validator = (schema, body) => ajv.validate(schema, body);
const errorMsg = errors => `Data validate error – ${ errors[0]['dataPath'].replace(/\./g, '') } parameter ${ errors[0]['message'] }`;

module.exports = {
    validatePersonalInfoV1: (req, res, next) => !validator(personalInfoV1Schema, req.body) ? next(new handlerError(errorMsg(ajv.errors), 400)) : next(),
    validatePersonalInfoV2: (req, res, next) => !validator(personalInfoV2Schema, req.body) ? next(new handlerError(errorMsg(ajv.errors), 400)) : next(),
    validateEvolutionHobbies: (req, res, next) => !validator(evolutionHobbiesSchema, req.body) ? next(new handlerError(errorMsg(ajv.errors), 400)) : next()
};


