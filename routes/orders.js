const express = require('express');
const { createOrder, getOrderById, getAllOrders, getDetailedOrders, updateOrder, deleteOrder, getDetailedOrder, getOrderByUserId, getTodayProfit, getProfitByMetodePembayaranCOD, getCanceledOrders, getCompletedOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/detailed', getDetailedOrders); // Admin view detailed order
router.get('/profit', getTodayProfit); // Admin view today's profit
router.get('/:id/detailed', getDetailedOrder); // Admin view detailed order
router.get('/profit/COD', getProfitByMetodePembayaranCOD); // Admin view profit by COD
router.get('/canceled', getCanceledOrders); // Admin view canceled orders
router.get('/completed', getCompletedOrders); // Admin view completed orders
router.post('/', createOrder); // User creates an order
router.get('/:id', getOrderById); // Get specific order by ID
router.get('/', getAllOrders); // Admin view all orders
router.get('/user/:userId', getOrderByUserId); // Get orders by user ID


router.put('/:id', updateOrder); // Admin update order
router.delete('/:id', deleteOrder); // Admin delete order


module.exports = router;
