const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/sign-up-page", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email.toUpperCase();
    const userByEmail = await User.findOne({ email: email });

    if (userByEmail) {
      return res.status(400).send({ message: "Email has already been taken" });
    }

    if (!req.body.email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) console.log(err);
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      await user.save();
      return res.status(200).send({ message: "Created new User" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.post("/log-in-page", async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email.toUpperCase();
  const userByEmail = await User.findOne({ email: email });

  if (!req.body.email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  } else if (!userByEmail) {
    return res.status(400).send({ message: "Email is incorrect" });
  }

  passport.authenticate("local", (err, user, info) => {
    console.log(user, info);
    if (err) {
      console.error(`Error: ${err}`);
      return res.status(500).send({ message: `Error: ${err}` });
    }
    if (!user) {
      console.log("Log in Error:", info);
      return res.status(401).send({ message: `${info.message}` });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send({ message: `Error: ${err}` });
      }
      return res
        .status(200)
        .send({ message: "Authentication succeeded", user });
    });
  })(req, res, next);
});

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send({ message: "Successfully logged out!" });
  });
});

module.exports = router;
