
const Auth = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: '3d' })
}
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    const token = generateToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports.register = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;
  try {
    const user = await Auth.signup(email, password, username, confirmPassword);
    const token = generateToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}