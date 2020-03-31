const Joi = require('joi');
const createError = require('http-errors');

const schemas = {
    first: Joi.object().keys({
        userNumb: Joi.string(),
        personalInfo: {
            givenName: Joi.string(),
            surname: Joi.string(),
            gender: Joi.string(),
            dob: Joi.string(),
            nationality: Joi.string(),
            phoneNumber: Joi.string(),
            homeAddress: Joi.string(),
            city: Joi.string(),
            postCode: Joi.string(),
            country: Joi.string(),
            passportStatus: Joi.string(),
            passportNumber:Joi.string(),
            passportExpectedDate: Joi.string(),
            passportExpiryDate: Joi.string(),
            isSectionStarted: Joi.boolean(),
            isSectionComplete: Joi.boolean(),
            isPage1Complete: Joi.boolean(),
            isPage2Complete: Joi.boolean(),
            isPage3Complete: Joi.boolean(),
            isPage4Complete: Joi.boolean(),
            isPage5Complete: Joi.boolean()
        },
        evolution: {
            hobbies: [{
                name: Joi.string(),
                timeStarted: Joi.string(),
                isKeepOnDoing: Joi.boolean()
            }],
            courses: [{
                name: Joi.string(),
                timeStarted: Joi.string(),
                timeEnd: Joi.string(),
                isKeepOnDoing: Joi.boolean(),
                doYouLikeIt: Joi.boolean()
            }],
            skills: [{
                name: Joi.string(),
                level: Joi.string(),
                improvements: String
            }],
            isSectionStarted: Joi.boolean(),
            isSectionComplete: Joi.boolean(),
            isPage1Complete: Joi.boolean(),
            isPage2Complete: Joi.boolean(),
            isPage3Complete: Joi.boolean()
        }
    }),
    second: Joi.object().keys({
        username: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string()
    }),
    third: Joi.object().keys({
        hobbies: [{
            name: Joi.string(),
            timeStarted: Joi.string(),
            isKeepOnDoing: Joi.boolean()
        }]
    })
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
