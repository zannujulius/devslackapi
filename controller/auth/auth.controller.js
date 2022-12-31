const { Users } = require("../../models/users.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authSignup = async (req, res) => {
  try {
    // take parameters from the frontend
    const { firstname, lastname, email, phone, password } = req.body;
    if (!(firstname && lastname && email && phone && password)) {
      return res.status(400).json({
        message: "error",
        data: "All fields are required.",
      });
    }
    const existingUser = await Users.findOne({
      email,
    });
    if (existingUser) {
      return res.status(409).json({
        message: "error",
        data: "user already exist.",
      });
    }
    const existingPhone = await Users.findOne({
      phone,
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "error",
        data: "The phone has been used by another user. Please try again.",
      });
    }
    const encyrptedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      firstname,
      lastname,
      email,
      phone,
      password: encyrptedPassword,
    });
    res.status(201).json({
      message: "success",
      data: "User created successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

const authSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        message: "error",
        data: "All fields are required.",
      });
    }
    const user = await Users.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: "error",
        data: "User doesn't exist. Please try again.",
      });
    }
    const decryptPassword = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_KEY_1,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      message: "success",
      data: { email, token: token },
    });
  } catch (err) {}
};

module.exports = {
  authSignup,
  authSignin,
};
