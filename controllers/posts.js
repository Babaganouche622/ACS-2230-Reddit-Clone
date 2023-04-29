const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    const currentUser = req.user;
    console.log("This is current user:", currentUser)
    try {
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
          const currentUser = req.user;
          subredditArray = req.body.subreddits.replaceAll(' ', '').split(',');
          req.body.subreddits = subredditArray;
          const post = new Post(req.body);
          // post.upVotes = [];
          // post.downVotes = [];
          // post.voteScore = 0;
          post.author = userId;
          await post.save();
          const user = await User.findById(userId);
          user.posts.unshift(post);
          await user.save();
          return res.redirect('/');
      } catch (err) {
          console.log(err.message);
      }
  } else {
      return res.status(401); // UNAUTHORIZED
  }
});

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const currentUser = req.user;
      const post = await Post.findById(req.params.id).populate('comments').lean();
      res.render('posts-show', { post, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const currentUser = req.user;
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

};