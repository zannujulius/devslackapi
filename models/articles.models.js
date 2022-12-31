const mongoose = require("mongoose");

const schemaType = {
  type: String,
  trim: true,
  required: true,
};
const articleSchema = mongoose.Schema({
  title: schemaType,
  content: schemaType,
  image: schemaType,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Articles = mongoose.model("Article", articleSchema);

module.exports = {
  Articles,
};
