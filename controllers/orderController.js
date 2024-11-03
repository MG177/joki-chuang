const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.json(newOrder);
};

// Fetch order by ID
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products.productId');
  res.json(order);
};

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
