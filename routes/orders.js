const express = require('express');
const { createOrder, getOrderById, getAllOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder); // User creates an order
router.get('/:id', getOrderById); // Get specific order by ID
router.get('/', getAllOrders); // Admin view all orders

module.exports = router;
