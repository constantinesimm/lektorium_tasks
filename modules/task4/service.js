const PersonalInfo = require('./model');
const HttpError = require('../../middleware/http-error');

/**
 * @param next
 * @returns {Promise<unknown>}
 */
const getAll = async (next) => new Promise((resolve, reject) => {
    PersonalInfo
        .find({})
        .then(docs => docs ? resolve(docs) : reject(new HttpError(404, 'No docs founded')))
        .catch(next);
});


/**
 * @param id
 * @param next
 * @returns {Promise<unknown>}
 */
const getOneById = async (id, next) => new Promise((resolve, reject) => {
    PersonalInfo
        .findOne({ _id: id })
        .then(user => user ? resolve(user) : reject(new HttpError(400, 'No user founded')))
        .catch(next);
});


/**
 * @param param
 * @param value
 * @param next
 * @returns {Promise<unknown>}
 */
const getOneByAnyParam = async (param, value, next) => new Promise((resolve, reject) => {
    PersonalInfo
        .findOne({ param: value })
        .then(user => user ? resolve(user) : reject(new HttpError(404, 'No user founded')))
        .catch(next);
});


/**
 * @param body
 * @param next
 * @returns {Promise<unknown>}
 */
const createDoc = async (body, next) => {
    return new Promise((resolve, reject) => {
        PersonalInfo
            .find({
                $or:
                    [
                        { 'userNumb': body['userNumb'] },
                        { 'personalInfo.passportNumber': { $eq: body.personalInfo.passportNumber }},
                        { 'personalInfo.phoneNumber': { $eq: body.personalInfo.phoneNumber }}
                    ]
            })
            .then(docs => {
                if (docs.length > 0) reject(new HttpError(400, 'Some fields is duplicated with already registered users. Check your phone number / passport number for unique value. If you are already registered - use login or use password recovery'))
                else new PersonalInfo(body).save()
                    .then(() => resolve({ message: 'User registration successful complete '}))
                    .catch(err => reject(new HttpError(err)));
            })
            .catch(next);
    });
}


/**
 * @param id
 * @param body
 * @param next
 * @returns {Promise<unknown>}
 */
const updateDoc = async (id, body, next) => new Promise((resolve, reject) => {
    PersonalInfo
        .findOne({ _id: id })
        .then(doc => {
            Object.keys(body).forEach(key => doc.personalInfo[key] = body[key]);

            doc.save()
                .then(() => resolve({ message: 'Document successful updated'}))
                .catch(err => reject(new HttpError(err)));
        })
        .catch(next);
});

/**
 * @param id
 * @returns {Promise<unknown>}
 */
const removeDoc = async (id) => new Promise((resolve, reject) => {
    PersonalInfo
        .findOneAndRemove({ _id: id })
        .then(() => resolve({ message: 'Document removed successful' }))
        .catch(err => reject(new HttpError(err)))
});

module.exports = {
    getAll,
    getOneById,
    getOneByAnyParam,
    createDoc,
    updateDoc,
    removeDoc
};