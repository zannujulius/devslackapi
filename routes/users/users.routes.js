const express = require("express");
const {
  getUsers,
  addUser,
} = require("../../controller/users/users.controller");
const { Users } = require("../../models/users.models");
const router = express.Router();

router.get("/users", getUsers);

module.exports = {
  userRoutes: router,
};
