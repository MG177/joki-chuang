const express = require('express');
const { createOrder, getOrderById, getAllOrders, getDetailedOrders, updateOrder, deleteOrder,getDetailedOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/detailed', getDetailedOrders); // Admin view detailed order
router.get('/:id/detailed', getDetailedOrder); // Admin view detailed order
router.post('/', createOrder); // User creates an order
router.get('/:id', getOrderById); // Get specific order by ID
router.get('/', getAllOrders); // Admin view all orders


router.put('/:id', updateOrder); // Admin update order
router.delete('/:id', deleteOrder); // Admin delete order


module.exports = router;
