const { model } = require("mongoose");
const { Users } = require("../../models/users.models");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    console.log(users);
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addUser,
  getUsers,
};
