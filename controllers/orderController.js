const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  //kurangi stok produk
  const products = req.body.products;
  for (const product of products) {
    const productId = product.productId;
    const quantity = product.quantity;
    const productToUpdate =
    await Product.findById(productId);
    productToUpdate.stock -= quantity;
    console.log(productToUpdate);
    
    await productToUpdate.save();
  }
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
  try {
    const { search } = req.query;
    let orders;

    if (search) {
      orders = await Order.find()
        .populate({
          path: 'products.productId',
          match: { name: { $regex: search, $options: 'i' } }
        })
        .populate({
          path: 'userId',
          match: {
            $or: [
              { username: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } }
            ]
          }
        });
      
      // Filter out orders where no matches were found
      orders = orders.filter(order => 
        order.userId !== null || 
        order.products.some(p => p.productId !== null)
      );
    } else {
      orders = await Order.find()
        .populate('products.productId')
        .populate('userId');
    }
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    });
  }
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

exports.getTodayProfit = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const orders = await Order.find({
    createdAt: { $gte: today, $lt: tomorrow },
  });
  const total = orders.reduce((acc, order) => acc + order.total, 0);
  res.json({ total });
};

exports.getProfitByMetodePembayaranCOD = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const orders = await Order.find({
    // createdAt: { $gte: today, $lt: tomorrow },
    metodePembayaran: 'COD',
  });
  const total = orders.reduce((acc, order) => acc + order.total, 0);
  res.json({ total });
};

exports.getCanceledOrders = async (req, res) => {
  const orders = await Order.find({ status: 'canceled' });
  res.json(orders.length);
};  

exports.getCompletedOrders = async (req, res) => {
  const orders = await Order.find({ status: 'completed' });
  res.json(orders.length);
};