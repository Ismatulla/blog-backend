const express = require('express');
const router = express.Router();
const auth = require('../controllers/register')
const blog = require('../controllers/createPost')
const auths = require('../middleware/userMiddleware')

router.post('/login', auth.login);
router.post('/register', auth.register);

router.get('/test', auths, (req, res) => {
  res.send('test');
})
router.post('/createPost', auths, blog.createPost);
module.exports = router;
