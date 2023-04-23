const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const user = require('../models/user');

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const currentUser = req.user;
      const posts = await Post.find({}).lean().populate('author');
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // NEW
  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    res.render('posts-new', {currentUser});
  });

  // Create Post
  app.post('/posts/new', async (req, res) => {
    if (req.user) {
      try {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        user.save();
        res.redirect(`/posts/${post._id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const currentUser = req.user;
      const post = await Post.findById(req.params.id).lean().populate({ path: 'comments', populate: { path: 'author'}}).populate('author');
      res.render('posts-show', { post, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const currentUser = req.user;
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean().populate('author');
      res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

};