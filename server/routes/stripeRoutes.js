const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const webhookSecret = process.env.STRIPE_SIGNING_SECRET
const { raw } = require('body-parser');

router.post("/create-checkout-session", async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: { userId },
      line_items: req.body.map((product) => {
        // Convert the dollar amount to cents
        const priceInCents = Math.round(product.price * 100);

        // Include color and size information
        const productData = {
          name: product.title,
          description: `Color: ${product.color.toUpperCase()} - Size: ${
            product.size
          }`, // Customize this based on your data
          images: [product.image],
        };

        return {
          price_data: {
            currency: "usd",
            product_data: productData,
            unit_amount: priceInCents,
          },
          quantity: product.productQuantity,
        };
      }),
      success_url: `https://virtual-emporium.onrender.com`,
      cancel_url: `https://virtual-emporium.onrender.com/cart`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router