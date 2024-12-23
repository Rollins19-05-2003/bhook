const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key ID
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET', // Replace with your Razorpay key secret
});

// Create order endpoint
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount, // Amount in paise
    currency: currency,
    receipt: "receipt#1", // Optional
    payment_capture: 1, // Auto capture
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;