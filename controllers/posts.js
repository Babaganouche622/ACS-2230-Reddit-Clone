const Post = require('../models/post');
// const { body, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');


module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
    const posts = await Post.find({}).lean();
    return res.render('posts-index', { posts: posts }); 
    } catch (err) {
      console.log(err.message);
    }
  });

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
  });

  // Create Post
  app.post('/posts/new', async (req, res) => {
    const post = new Post(req.body);
  
    try {
      await post.save();
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  });

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      res.render('posts-show', { post: post });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts: posts });
    } catch (err) {
      console.log(err.message);
    }
  });

};