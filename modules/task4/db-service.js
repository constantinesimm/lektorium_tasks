const PersonalInfo = require('./model');
const handleError = require('./middleware/errors');

const get = async (next) => {
    return new Promise((resolve, reject) => {
        PersonalInfo
            .find({})
            .then(docs => {
                if (docs) resolve(docs)
                else reject(new handleError('No docs founded', 404))
            })
            .catch(next);
    })
};

const getOneById = async (id, next) => {
    return new Promise((resolve, reject) => {
        PersonalInfo
            .findOne({ _id: id })
            .then(user => {
                if (!user) reject(new handleError('Invalid ID value', 400))
                else resolve(user)
            })
            .catch(next);
    })
};

const getOneByAnyParam = async (param, value, next) => {
    return new Promise((resolve, reject) => {
        PersonalInfo
            .findOne({ param: value })
            .then(user => {
                if (user) resolve(user);
                else reject(new handleError('No user founded', 404))
            })
            .catch(next);
    })
};

const createDoc = async (body, next) => {
    return new Promise((resolve, reject) => {
        //checking users fields duplicated
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
                if (docs.length > 0) reject(new handleError('Some fields is duplicated with already registered users. Check your phone number / passport number for unique value. If you are already registered - use login or use password recovery'))
                else {
                    new PersonalInfo(body).save()
                        .then(() => resolve({ message: 'User registration successful complete '}))
                        .catch(err => reject(new handleError(err, 400)))
                }
            })
            .catch(next);
    })
};

const updateDoc = async (id, body, next) => {
    return new Promise((resolve, reject) => {
        PersonalInfo
            .findOne({ _id: id })
            .then(doc => {
                Object.keys(body).forEach(key => doc.personalInfo[key] = body[key]);

                doc.save()
                    .then(() => resolve({ message: 'Document successful updated'}))
                    .catch(err => reject(new handleError(err, 400)));
            })
            .catch(next)
    })
};

const removeDoc = async (id) => {
    return new Promise((resolve, reject) => {
        PersonalInfo
            .findOneAndRemove({ _id: id })
            .then(() => resolve({ message: 'Document removed successful' }))
            .catch(err => reject(new handleError(err)))
    })
};

module.exports = {
    get,
    getOneById,
    getOneByAnyParam,
    createDoc,
    updateDoc,
    removeDoc
};