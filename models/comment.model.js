const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "article",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes: {
    type: [mongoose.Types.ObjectId],
  },
});

const Comment = mongoose.model("Comments", commentSchema);

module.exports = {
  Comment,
};
