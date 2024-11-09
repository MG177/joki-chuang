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

exports.updateOrder = async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedOrder);
};

exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};

exports.getDetailedOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('products.productId')
    .populate('userId');
  res.json(orders);
};

exports.getDetailedOrder = async (req, res) => {
  const orders = await Order.findById(req.params.id)
    .populate('products.productId')
    .populate('userId');
  res.json(orders);
};

exports.getOrderByUserId = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};