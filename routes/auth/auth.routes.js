const express = require("express");
const { Users } = require("../../models/users.models");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  authSignup,
  authSignin,
} = require("../../controller/auth/auth.controller");
const passport = require("passport");
const { checkLoggedIn } = require("../../middleware/checkLoggedIn");

// normal signup
router.post("/signup", authSignup);
router.post("/signin", authSignin);

// google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/auth/secret",
    session: true,
  }),
  (req, res) => {
    console.log("Google got to the callback url /////");
  }
);

router.get("/failure", (req, res) => {
  res.send("Failed to log in");
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

router.get("/secret", checkLoggedIn, (req, res) => {
  console.log(req.ip);
  res.send("Got to the secret page.");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

module.exports = router;
