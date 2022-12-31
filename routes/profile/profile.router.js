const express = require("express");
const {
  getProfile,
  editProfile,
  updateImage,
} = require("../../controller/profile/profile.controller");
const { verifyToken } = require("../../middleware/verifytoken");
const router = express.Router("");
const multer = require("multer");

const uniqueSuffix = (file) => Date.now() + "." + file.mimetype.split("/")[1];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uniqueSuffix(file));
  },
});

const upload = multer({ storage: storage });

router.get("/profile", getProfile);
router.patch("/profile", verifyToken, editProfile);

router.patch(
  "/profile/image",
  verifyToken,
  upload.single("profileimage"),
  updateImage
);

module.exports = router;
