const router = require('express').Router();
const service = require('./db-service');
const {validatePersonalInfoV1, validatePersonalInfoV2, validateEvolutionHobbies} = require('./validator');
const handleError = require('./middleware/errors');

router.post('/get/personal-info/step-1', async (req, res, next) => {
    await service
        .get(next)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/get/:id', async (req, res, next) => {
    await service
        .getOneById(req.params.id)
        .then(user => res.json(user))
        .catch(next)
});

router.post('/create/personal-info/step-1', validatePersonalInfoV1, async (req, res, next) => {
    await service
        .createDoc(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/update/:id/v1/personal-info/step-1', validatePersonalInfoV1, async (req, res, next) => {
    await service
        .updateDoc(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/update/:id/v2/personal-info/step-1', validatePersonalInfoV2, async (req, res, next) => {
    await service
        .updateDoc(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/update/:id/evolution/step-1', validateEvolutionHobbies, async (req, res, next) => {
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