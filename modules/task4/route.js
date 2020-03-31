const router = require('express').Router();
const { schemas, validator } = require('./validator');

router.post('/1/personal-info/step-1', validator(schemas.first, 'body'));

router.post('/2/personal-info/step-1', validator(schemas.second, 'body'));

router.post('/3/evolution/step-1', validator(schemas.third, 'body'));

module.exports = router;