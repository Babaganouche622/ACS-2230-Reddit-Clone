const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

commentSchema
  .pre('findOne', function (next) {
    this.populate('author');
    next();
  })
  .pre('find', function (next) {
    this.populate('author');
    next();
  })
  .pre('find', function (next) {
    this.populate('comments');
    next();
  })
  .pre('findOne', function (next) {
    this.populate('comments');
    next();
  });



module.exports = model('Comment', commentSchema);
