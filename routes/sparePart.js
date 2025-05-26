const express = require('express');
const router = express.Router();
const { addSparePart, getSpareParts } = require('../controllers/sparePartController');

router.post('/', addSparePart);
router.get('/', getSpareParts);

module.exports = router;
