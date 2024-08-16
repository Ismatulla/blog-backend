const Post = require('../models/createPost');
const User = require('../models/userSchema')
module.exports.createPost = async (req, res) => {
  const { title, content, category, author } = req.body;
  try {
    const author = req.userId
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = new Post({ title, content, author, category });
    await post.save();
    res.status(200).json({ post })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}