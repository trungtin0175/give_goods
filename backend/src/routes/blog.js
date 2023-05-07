const express = require("express");

const router = express.Router();

const token = require("../middleware/Token");

const blogController = require("../app/controllers/BlogController");

const uploadCloud = require("../middleware/Uploader");

router.get("/", blogController.getAllBlog);
// token.verifyToken,

router.get("/filter", blogController.getFilterBlog);

router.get("/create", token.verifyToken, blogController.getCreateBlog);

router.post(
  "/create",
  token.verifyToken,
  uploadCloud.single("image"),
  blogController.postBlog
);

router.get("/store/:_id", token.verifyToken, blogController.getBlog);

router.delete("/store/:_id", token.verifyToken, blogController.deleteBlog);

router.get("/store/:_id/edit", token.verifyToken, blogController.getEditBlog);

router.put(
  "/store/:_id/edit",
  token.verifyToken,
  uploadCloud.single("image"),
  blogController.putBlog
);

router.get("/search", blogController.searchBlog);
// , token.verifyToken

module.exports = router;
