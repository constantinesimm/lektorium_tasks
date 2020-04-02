const fs = require('fs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const HttpError = require('../../middleware/http-error');

const { secretKey, userPermission } = require('../../config');

const allowAccess = (role, path) => userPermission[role].includes(path.split('/')[1]);

const signToken = query => jwt.sign({
    uid: v4(),
    created: Date.now(),
    role: query
}, secretKey, { expiresIn: '1h' });

const verifyToken = (token, next) => jwt.verify(token, secretKey, (err, decoded) => {
    if (err) next(new HttpError(401, `Unauthorized! ${ err.message }`));

    return decoded.role;
});

module.exports = {
    allowAccess,
    signToken,
    verifyToken
};