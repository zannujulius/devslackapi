const { Users } = require("../../models/users.models");

// update profile
const editProfile = async (req, res) => {
  try {
    const { firstname, lastname, phone, id, image } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "error",
        data: "Please provide a user id",
      });
    }
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({
        message: "error",
        data: "User not found",
      });
    }
    const updateuser = await Users.findOneAndUpdate(
      { _id: id },
      {
        firstname: existingUser.firstname || firstname,
        lastname: existingUser.lastname || lastname,
        phone: existingUser.phone || phone,
        // image: req.file.path.split("/")[1].trim(),
      },
      { new: true }
    );
    return res.status(201).json({
      message: "success",
      data: "User profile updated successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

// get profile
const getProfile = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        message: "error",
        data: "Please provide a user id",
      });
    }
    const user = await Users.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "error",
        data: "User not found.",
      });
    }
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

//update profile,
const updateImage = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "error",
        data: "Please provide a user id",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "error",
        data: "Please upload a file.",
      });
    }
    const existingUser = await Users.findById(id);
    if (!existingUser) {
      return res.status(400).json({
        message: "error",
        data: "User not found",
      });
    }
    const updateuser = await Users.findOneAndUpdate(
      { _id: id },
      {
        image: req.file.path.split("/")[1].trim(),
      },
      { new: true }
    );
    return res.status(201).json({
      message: "success",
      data: "User profile updated successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  editProfile,
  getProfile,
  updateImage,
};
