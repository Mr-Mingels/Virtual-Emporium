const bcrypt = require("bcryptjs");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      // Note the addition of 'username' parameter
      try {
        console.log("password:", password);
        const email = req.body.email; // Get the email from the request
        const userByEmail = await User.findOne({ email: email }); // Look for a user with the email

        if (!userByEmail) {
          return done(null, false, { message: "Incorrect email" });
        }

        bcrypt.compare(password, userByEmail.password, (err, res) => {
          if (err) {
            return done(err);
          }

          if (res) {
            // Passwords match! Log the user in
            return done(null, userByEmail);
          } else {
            // Passwords do not match
            return done(null, false, { message: "Incorrect password" });
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  localStrategy: passport.initialize(),
  session: passport.session(),
};
