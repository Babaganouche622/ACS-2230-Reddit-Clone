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
};