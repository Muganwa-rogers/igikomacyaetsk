const express = require('express');
const router = express.Router();
const { addStockOut, getStockOuts, updateStockOut, deleteStockOut } = require('../controllers/stockOutController');

router.post('/', addStockOut);
router.get('/', getStockOuts);
router.put('/:id', updateStockOut);
router.delete('/:id', deleteStockOut);

module.exports = router;
