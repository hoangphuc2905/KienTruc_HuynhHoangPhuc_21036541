const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantityDeducted: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
