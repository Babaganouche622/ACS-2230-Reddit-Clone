const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

postSchema
  .pre('findOne', function (next) {
    this.populate('author');
    next();
  })
  .pre('find', function (next) {
    this.populate('author');
    next();
  });

module.exports = model('Post', postSchema);
