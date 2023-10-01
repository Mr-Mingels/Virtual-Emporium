const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env")});
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
const cors = require("cors");
const {
  localStrategy,
  session: passportSession,
} = require("./controllers/authController");
const connectToMongoDb = require("./controllers/mongoController");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")
const stripeRoutes = require("./routes/stripeRoutes")
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:3000", "https://virtual-emporium.onrender.com/"], credentials: true }));

app.post('/stripe-checkout-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

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

// Parse incoming JSON request bodies and make the data available in req.body
app.use(express.json());

// Parse incoming URL-encoded request bodies (typically from HTML forms) and make the data available in req.body
app.use(express.urlencoded({ extended: true }));

// Configure session management middleware for maintaining user sessions
app.use(
  session({
    secret: "secret", // A secret key for encrypting session data (change this for security)
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Set the session cookie to expire after 1 week (adjust as needed)
    resave: true, // Forces the session to be saved back to the session store, even if it wasn't modified during the request
    saveUninitialized: true, // Forces an uninitialized session to be saved to the store
    store: new MongoDBStore({
      mongoUrl: process.env.MONGODB_URL,
      collection: "mySessions",
    }),
  })
);

app.use(localStrategy);
app.use(passportSession);
app.use(authRoutes);
app.use(productRoutes);
app.use(stripeRoutes)

connectToMongoDb();

app.get("/user-info", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send("Unauthorized");
  }
});


app.use(express.static(path.join(__dirname, '../client/build')));

// Handle any remaining requests by serving the client's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
