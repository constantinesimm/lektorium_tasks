const fs = require('fs');
const router = require('express').Router();
const { readHudgeData } = require('./service');



router.post('/stream/hudge-data', async (req, res, next) => {
    await readHudgeData(req, res, next)
        .then(data => res.json(data))
        .catch(next);
});

module.exports = router;