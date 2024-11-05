const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

connectDB();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
