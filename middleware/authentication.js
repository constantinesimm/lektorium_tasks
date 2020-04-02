const service = require('../services/secure/service');
const HttpError = require('./http-error');

module.exports = (req, res, next) => {
    const authToken = req.headers['x-access-token'];
    const userRole = service.verifyToken(authToken, next);

    if (!authToken) next(new HttpError(401, "Unauthorized! Access header 'x-access-token' is missing"));
    if (!service.allowAccess(userRole, req.path)) next(new HttpError(403, 'Forbidden! You dont have permission to get this resource'));
    else next()
};
