const mongoose = require("mongoose");

// Define the Product schema
const wishListItemSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  category: String,
  description: String,
  id: Number,
  image: String,
  price: Number,
  rating: {
    count: Number,
    rate: Number,
  },
  title: String,
});

module.exports = mongoose.model("WishListItem", wishListItemSchema);