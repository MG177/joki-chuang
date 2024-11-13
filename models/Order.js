const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  metodePengiriman: { type: String, required: true },
  metodePembayaran: { type: String, required: true },
  phoneNumber: { type: String },
  norek: { type: String },
  status: { type: String, default: 'pending' }, // Other statuses could be 'shipped', 'completed', etc.
  address: { type: String},
  ongkir: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
