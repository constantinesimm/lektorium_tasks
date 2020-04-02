const router = require('express').Router();
const service = require('./service');
const validatePersonalInfo = require('../../middleware/validator');

router.post('/get/personal-info/step-1', async (req, res, next) => {
    await service
        .getAll(next)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/get/:id', async (req, res, next) => {
    await service
        .getOneById(req.params.id)
        .then(user => res.json(user))
        .catch(next)
});

router.post('/create/personal-info/:schema', validatePersonalInfo, async (req, res, next) => {
    await service
        .createDoc(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/update/:id/personal-info/:schema/step-1', validatePersonalInfo, async (req, res, next) => {
    await service
        .updateDoc(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/remove/:id', async (req, res, next) => {
    await service
        .removeDoc(req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

module.exports = router;