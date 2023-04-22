const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
    const post = await Post.findById(req.params.postId);
    const comment = new Comment(req.body);
    post.comments.unshift(comment);
    await comment.save();
    await post.save();
    res.redirect(`/`);
    } catch (err) {
    console.log(err);
  }
});
};
