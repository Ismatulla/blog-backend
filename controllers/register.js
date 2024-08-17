
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: '3d' })
}
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports.register = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;
  try {
    const user = await User.signup(email, password, username, confirmPassword);
    if (!user) {
      return res.status(400).json({ error: 'User creation failed' });
    }
    const token = generateToken(user._id)
    res.status(201).json({ email, token })
  } catch (error) {
    console.log('Registration error', error)
    res.status(400).json({ error: error.message })
  }
}