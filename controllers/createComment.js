const Comment = require('../models/RelatedComments');
const User = require('../models/userSchema')
const Post = require('../models/createPost');

module.exports.createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params
  console.log(postId, 'id')
  try {
    const author = req.userId
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comment = new Comment({ content, post: postId, author });
    await comment.save();
    res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// like comment
module.exports.likeComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.userId;
  if (!commentId) {
    return res.status(400).json({ error: 'Comment ID is required in the request body' });
  }
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.likes.includes(userId)) {
      return res.status(400).json({ error: 'You already like this comment' });
    }
    comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId.toString());
    comment.likes.push(userId);
    await comment.save();
    res.status(200).json({ message: "Comment liked successfully", comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.dislikeComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.userId;
  if (!commentId) {
    return res.status(400).json({ error: 'Comment ID is required in the request body' });
  }
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.dislikes.includes(userId)) {
      return res.status(400).json({ error: 'You already dislike this comment' });
    }
    comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
    comment.dislikes.push(userId);
    await comment.save();
    res.status(200).json({ message: 'Comment disliked successfully', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
