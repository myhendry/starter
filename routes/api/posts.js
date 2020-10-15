const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const Post = require("../../models/Post");
const User = require("../../models/User");

//#region
/**
 * @swagger
 * /api/posts:
 *  get:
 *    description: Access Private - Get List of Posts
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Internal Server Error
 */
//#endregion
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate("user", ["name"]);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//#region
/**
 * @swagger
 * /api/posts:
 *  post:
 *    description: Access Private - Add Post
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Internal Server Error
 */
//#endregion
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        title,
        content,
        avatar: user.avatar,
        user: req.user.id,
      });
      res.json(await newPost.save());
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//#region
/**
 * @swagger
 * /api/posts:
 *  put:
 *    description: Access Private - Edit Post
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Internal Server Error
 */
//#endregion
router.put(
  "/:postId",
  [
    [auth, checkObjectId("postId")],
    [check("content", "Content is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;
    const postId = req.params.postId;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: "Post not Found" });
      }
      await Post.findByIdAndUpdate(postId, {
        content,
      });
      return res.status(200).send({ msg: "Post Updated" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//#region
/**
 * @swagger
 * /api/posts:
 *  delete:
 *    description: Access Private - Delete Post
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Internal Server Error
 */
//#endregion
router.delete("/:postId", [auth, checkObjectId("postId")], async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId).select("-password");
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ msg: "Post Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
