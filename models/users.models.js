const mongoose = require("mongoose");

const schemaType = {
  type: String,
  trim: true,
  lowercase: true,
  required: true,
};

const userSchema = mongoose.Schema({
  firstname: schemaType,
  lastname: schemaType,
  email: schemaType,
  phone: schemaType,
  method: { type: String, default: "auth" },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = { Users };
