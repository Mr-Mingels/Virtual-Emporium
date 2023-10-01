const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  category: String,
  color: String,
  description: String,
  id: Number,
  image: String,
  price: Number,
  productQuantity: Number,
  rating: {
    count: Number,
    rate: Number,
  },
  size: String,
  title: String,
});

module.exports = mongoose.model("Product", productSchema);
