const Ajv = require('ajv');
const HttpError = require('../http-error');
const personalInfoSchema = require('./schemas/personalInfoSchema');


module.exports = (req, res, next) => {
    const ajv = new Ajv();
    const validateSchema = req.params.schema;

    return ajv.validate(personalInfoSchema[validateSchema], req.body) ? next() : next(new HttpError(400, `FIELD_VALIDATION ${ ajv.errors[0].dataPath.split('.').pop() } ${ ajv.errors[0].message }`));
};
