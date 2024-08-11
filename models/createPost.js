const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CreatePostSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('CreatePost', CreatePostSchema)

