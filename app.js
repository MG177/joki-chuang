const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

module.exports = app;
