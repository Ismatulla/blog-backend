const Post = require('../models/createPost');
module.exports.createPost = async (req, res) => {
  const { title, content, category, author } = req.body;

  try {

    const post = new Post({ title, content, author, category });
    await post.save();
    res.status(200).json({ post })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}