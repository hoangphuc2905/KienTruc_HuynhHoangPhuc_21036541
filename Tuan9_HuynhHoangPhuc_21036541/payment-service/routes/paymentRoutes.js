const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const axios = require("axios");

// Confirm Payment
router.post("/confirm", async (req, res) => {
  const { orderId } = req.body;
  try {
    // Fetch order from order-service to validate totalAmount
    const orderResponse = await axios.get(
      `http://order-service:3003/api/orders/${orderId}`
    );
    const order = orderResponse.data;

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const payment = new Payment({
      orderId,
      totalAmount: order.totalAmount,
      status: "completed",
    });
    await payment.save();

    // Update order status to "processing"
    await axios.put(`http://order-service:3003/api/orders/${orderId}`, {
      status: "processing",
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: "Payment processing failed" });
  }
});

// Refund Payment
router.post("/refund", async (req, res) => {
  const { orderId } = req.body;
  try {
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { status: "failed" },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Update order status to "cancelled"
    await axios.put(`http://order-service:3003/api/orders/${orderId}`, {
      status: "cancelled",
    });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: "Refund processing failed" });
  }
});

module.exports = router;
