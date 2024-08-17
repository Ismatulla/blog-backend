const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  console.log(req.headers, 'request from middleware')
  if (!token) {
    return res.status(401).json({ error: 'token is required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
module.exports = auth