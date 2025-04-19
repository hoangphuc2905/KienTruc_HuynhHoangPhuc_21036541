const express = require("express");
const router = express.Router();
const Shipping = require("../models/Shipping");
const axios = require("axios");

router.post("/update", async (req, res) => {
  const { orderId, status } = req.body;
  try {
    let shipping = await Shipping.findOne({ orderId });
    if (!shipping) {
      shipping = new Shipping({ orderId, status });
    } else {
      shipping.status = status;
      shipping.updatedAt = Date.now();
    }
    await shipping.save();

    if (status === "delivered") {
      await axios.put(`http://order-service:3002/api/orders/${orderId}`, {
        status: "completed",
      });
    } else if (status === "shipped") {
      await axios.put(`http://order-service:3002/api/orders/${orderId}`, {
        status: "processing",
      });
    }

    res.json(shipping);
  } catch (err) {
    res.status(500).json({ error: "Shipping update failed" });
  }
});

module.exports = router;
