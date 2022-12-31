const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth/auth.routes");
const profileRoutes = require("./routes/profile/profile.router");
const articlesRoute = require("./routes/articles/articles.routes");
const { mongoConnect } = require("./services/dbConnection");
const { Users } = require("./models/users.models");
const bcrypt = require("bcrypt");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// process
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

async function verifyCallBack(accessToken, refreshToken, profile, done) {
  try {
    // check for existing user
    const existingUser = await Users.findOne({
      emails: profile._json?.email,
    });

    if (existingUser) {
      res.status(409).json({
        message: "error",
        data: "user alredy exist.",
      });
      return done(null, profile);
    }
    // encyrpt user password
    const encyrptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await Users.create({
      firstname,
      lastname,
      email,
      phone,
      password: accessToken,
      method: "google",
      token: accessToken,
    });
    // create token

    // return response
    res.status(201).json({
      message: "success",
      data: "User created successfully",
    });
    console.log(accessToken);
  } catch (err) {
    console.log(err.message);
  }
}

passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    verifyCallBack
  )
);

// save the cookie to the user browser
passport.serializeUser((user, done) => {
  console.log(user.id, "/////");
  done(null, user.id);
});

// Read the cookie on the server`
passport.deserializeUser((id, done) => {
  done(null, id);
});

app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use(articlesRoute);
app.use(profileRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "error",
    data: "Route not found.",
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = {
  app,
};
