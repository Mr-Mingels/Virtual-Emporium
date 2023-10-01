const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
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
      success_url: `http://localhost:3000/cart`,
      cancel_url: `http://localhost:3000/cart`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router