const router = require('express').Router();
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const HttpError = require('../../middleware/http-error');
const service = require('./service');

router.post('/access/get-token', (req, res, next) => {
    let role = req.query.role;
    const createAuthToken = service.signToken(role);

    res.status(200).json({
        info: 'Token will expired in 1h. Add request header: "X-ACCESS-TOKEN": "< token >"',
        token: createAuthToken
    });
});

module.exports = router;