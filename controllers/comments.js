const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      if (req.user) {
        const comment = new Comment(req.body);
        const userId = req.user._id;
        comment.author = userId;
        await comment.save();
        const post = await Post.findById(req.params.postId);
        post.comments.unshift(comment);
        await post.save();
        res.redirect(`/`);
      } else {
        return res.status(401); // UNAUTHORIZED
      }
    } catch (err) {
      console.log(err);
    }
  });
};
