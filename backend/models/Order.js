const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        id: String,
        name: String,
        priceLabel: String,
        rawPrice: Number,
        quantity: Number,
        image: String
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
