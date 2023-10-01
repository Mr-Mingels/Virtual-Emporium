const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const webhookSecret = process.env.STRIPE_SIGNING_SECRET

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

router.post('/stripe-checkout-webhook', express.json({type: 'application/json'}), async (req, res) => {
  try {
    const event = req.body;
    console.log("Webhook req.body:", req.body)
    console.log("Webhook metadata:", req.body.data.object.metadata)
    console.log("Webhook metadata:", req.body.data.object.metadata.userId)
    console.log('event:', event)

    // Handle the event based on its type (e.g., checkout.session.completed)
    if (event.type === 'checkout.session.completed') {
      const userId = event.data.object.metadata.userId;
      // Update your database or perform other actions
      await Product.deleteMany({ userID: userId });
      console.log('Checkout completed:', event.data.object.id);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error handling webhook:', err);
    res.status(400).send('Webhook Error');
  }
})

module.exports = router