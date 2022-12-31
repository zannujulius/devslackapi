const { getPagination, removeDuplicates } = require("../../helperFunctions");
const { Articles } = require("../../models/articles.models");
const { Comment } = require("../../models/comment.model");

// articles
const getArticles = async (req, res) => {
  try {
    const { limit, skip } = getPagination(req.query);
    const posts = await Articles.find()
      .skip(skip)
      .limit(limit)
      .populate("userId", "_id firstname lastname email image")
      .populate("likes", "_id firstname lastname email image")
      .exec((err, data) => {
        if (err) {
          return console.log("An error occured while fetching post");
        }
        return res.status(200).json({
          mesgage: "success",
          data: data,
        });
      });
  } catch (err) {
    console.log(err.message);
  }
};
// post
const postArticles = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!(title && content)) {
      return res.status(400).json({
        message: "error",
        data: "All fields are required.",
      });
    }

    const newPost = await Articles.create({
      title,
      image: req.file.path.split("/")[1].trim(),
      content,
      userId: req.user?._id,
    });

    return res.status(201).json({
      message: "success",
      data: "Post added successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

// like
const postLike = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "error",
        data: "Please provide an article id.",
      });
    }
    const article = await Articles.findById(id);
    if (!article) {
      return res.status(400).json({
        message: "error",
        data: "Article not found.",
      });
    }
    // get the profile details from the authorization bearer
    const profile = req.user;
    const likes = [...article.likes, profile?._id];
    const updateArticleLike = await Articles.findOneAndUpdate(
      { _id: id },
      {
        likes: likes,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      data: "Update successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

// comments
const getComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json({
      message: "success",
      data: comments,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// comment on an article
const postComment = async (req, res) => {
  try {
    const { comment, id } = req.body;
    if (!comment) {
      return res.status(401).json({
        message: "error",
        data: "Please provide a comment",
      });
    }
    const newComment = await Comment.create({
      comment: comment,
      articleId: id,
      userId: req.user._id,
    });
    return res.status(200).json({
      message: "success",
      data: "Comment added successfully.",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getArticles,
  postArticles,
  postComment,
  getComment,
  postLike,
};
