const express = require('express');
const router = express.Router();
const { addStockIn, getStockIns } = require('../controllers/stockInController');

router.post('/', addStockIn);
router.get('/', getStockIns);

module.exports = router;
