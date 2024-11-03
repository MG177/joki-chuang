const Product = require('../models/Product');

// Fetch all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Fetch single product by ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// Create new product with optional image
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image } = req.body;
    const newProduct = new Product({ name, price, description, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Update existing product with new details, including image
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};
// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
