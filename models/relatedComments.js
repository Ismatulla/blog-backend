const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RelatedCommentsSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'createPost',

  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',

  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
  ],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('RelatedComments', RelatedCommentsSchema)