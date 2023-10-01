const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const WishListItem = require("../models/wishListItem");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/add-product-to-cart", async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const productColor = req.body.color;
    const productSize = req.body.size;
    const productId = req.body.id;
    const productQuantityToAdd = req.body.productQuantity;
    // Check whether or not if you already have that exact product in your cart
    const productToUpdate = await Product.findOne({
      userID: userId,
      color: productColor,
      size: productSize,
      id: productId,
    });

    // if you do then add the added product quantity only, so you don't have any duplicate products in your cart
    if (productToUpdate) {
      //Update the product quantity by adding the new quantity
      productToUpdate.productQuantity += productQuantityToAdd;

      // Save the updated product
      await productToUpdate.save();

      res.status(200).json({ message: "Cart Product updated successfully" });
    } else {
      const product = new Product({
        userID: userId,
        category: req.body.category,
        color: productColor,
        description: req.body.description,
        id: productId,
        image: req.body.image,
        price: req.body.price,
        productQuantity: req.body.productQuantity,
        rating: {
          count: req.body.count,
          rate: req.body.rate,
        },
        size: productSize,
        title: req.body.title,
      });
      await product.save();
      return res.status(200).send({ message: "Added Product to cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.post("/add-product-to-wishlist", async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const productId = req.body.id;

    const itemsInWishList = await WishListItem.findOne({
      userID: userId,
      id: productId,
    });

    if (itemsInWishList) {
      return res.status(400).send({ message: "Item is already in wishlist" });
    } else {
      const wishListItem = new WishListItem({
        userID: userId,
        category: req.body.category,
        description: req.body.description,
        id: productId,
        image: req.body.image,
        price: req.body.price,
        rating: {
          count: req.body.count,
          rate: req.body.rate,
        },
        title: req.body.title,
      });
      await wishListItem.save();
      return res.status(200).send({ message: "Added Product to wishlist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
});

router.get("/cart-products", async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const cartProducts = await Product.find({ userID: userId });
    if (cartProducts.length > 0) {
      return res.status(200).json({ cartProducts });
    } else {
      return res.status(400).send({ message: "Cart is empty" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.get("/wishlist-items", async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const wishListItems = await WishListItem.find({ userID: userId });
    if (wishListItems.length > 0) {
      return res.status(200).json({ wishListItems });
    } else {
      return res.status(400).send({ message: "WishList is empty" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.delete("/remove-product", async (req, res) => {
  try {
    if (req.body.productId) {
      const productId = req.body.productId;
      const deletedProduct = await Product.findOneAndDelete({ _id: productId });
      if (deletedProduct) {
        res.status(200).json({ message: "Product deleted" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid Product ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.delete("/remove-item-from-wishlist", async (req, res) => {
  try {
    if (req.body.productId) {
      const productId = req.body.productId;
      const deletedProduct = await WishListItem.findOneAndDelete({
        _id: productId,
      });
      if (deletedProduct) {
        res.status(200).json({ message: "Item removed from wishlist" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid Product ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
