const express = require("express");
const { verifyToken } = require("../../middleware/verifytoken");
const { Articles } = require("../../models/articles.models");
const multer = require("multer");
const { getPagination } = require("../../helperFunctions");
const {
  getArticles,
  postArticles,
  postComment,
  getComment,
  postLike,
} = require("../../controller/articles/articles.controller");

const router = express.Router();

const uniqueSuffix = (file) => Date.now() + "." + file.mimetype.split("/")[1];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(".")[0] + uniqueSuffix(file));
  },
});

const upload = multer({ storage: storage });

router.get("/articles", verifyToken, getArticles);
// post articles
router.post(
  "/articles",
  upload.single("profileimage"),
  verifyToken,
  postArticles
);
// like post
router.post("/articles/like", verifyToken, postLike);
// comments
router.post("/articles/comment", verifyToken, postComment);

module.exports = router;
