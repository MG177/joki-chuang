const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getTotalProducts } = require('../controllers/productController');
const router = express.Router();

// Public Routes
router.get('/total', getTotalProducts);  // Move this BEFORE the /:id route
router.get('/', getAllProducts);

// Routes with parameters
router.get('/:id', getProductById);

// Admin Routes
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
