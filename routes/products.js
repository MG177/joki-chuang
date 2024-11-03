const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Public Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin Routes
router.post('/', createProduct); // Ideally, protected by admin middleware
router.put('/:id', updateProduct); // Admin
router.delete('/:id', deleteProduct); // Admin

module.exports = router;
