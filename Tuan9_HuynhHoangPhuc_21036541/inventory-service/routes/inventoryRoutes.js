const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const axios = require("axios");

router.post("/update", async (req, res) => {
  const { orderId } = req.body;
  try {
    const orderResponse = await axios.get(
      `http://order-service:3002/api/orders/${orderId}`
    );
    const order = orderResponse.data;

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    for (const item of order.products) {
      const { productId, quantity } = item;

      const productResponse = await axios.get(
        `http://product-service:3003/api/products/${productId}`
      );
      const product = productResponse.data;

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${productId} not found` });
      }

      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for product ${productId}` });
      }

      await axios.put(`http://product-service:3003/api/products/${productId}`, {
        stock: product.stock - quantity,
      });

      const inventory = new Inventory({
        productId,
        quantityDeducted: quantity,
        orderId,
      });
      await inventory.save();
    }

    res.json({ message: "Inventory updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Inventory update failed" });
  }
});

module.exports = router;
