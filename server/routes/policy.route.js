const { Router } = require('express');
const policyController = require('../controllers/policy.controller');

const router = new Router();

router.get('/', policyController.getPolicy);
router.put('/update/:policyId', policyController.putUpdatePolicy);
router.get('/region/:region', policyController.getPolicyByRegion);
router.get('/id/:id', policyController.getPolicyById);

module.exports = router;