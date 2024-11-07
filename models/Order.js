const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  metodePengiriman: { type: String, required: true },
  metodePembayaran: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  norek: { type: String, required: true },
  ongkir: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // Other statuses could be 'shipped', 'completed', etc.
  address: { type: String, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
