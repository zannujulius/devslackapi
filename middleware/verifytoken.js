const jwt = require("jsonwebtoken");
const { Users } = require("../models/users.models");

require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization.split(" ")) {
      return res.status(401).send({
        statusMessage: "Unauthorized",
        message: "You are not authorized to access this resource",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        statusMessage: "Unauthorized",
        message: "You are not authorized to access this resource",
      });
    } 
    const data = await jwt.verify(token, process.env.TOKEN_KEY_1);
    if (!data)
      return res.status(403).json({
        statusMessage: "error",
        message: "Invalid token",
      });
    const user = await Users.findById({ _id: data._id });
    req.user = user;
    next();
  } catch (err) {
    if (err.message == "jwt expired") {
      return res.status(400).json({
        message: "error",
        data: "Invalid session",
      });
    }
  }
};

module.exports = { verifyToken };
