const express = require('express');
const router = express.Router();
const elementIdentifierController = require('../controller/identifier');

// POST endpoint to identify web element
router.post('/element-identifier', identifier.identifyElement);

module.exports = router;