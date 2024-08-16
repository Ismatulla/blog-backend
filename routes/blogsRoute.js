const express = require('express');
const router = express.Router();
const auth = require('../controllers/register')
const createComment = require('../controllers/createComment')
const blog = require('../controllers/createPost')
const auths = require('../middleware/userMiddleware')

router.post('/login', auth.login);
router.post('/register', auth.register);

router.get('/test', auths, (req, res) => {
  res.send('test');
})
router.post('/createPost', auths, blog.createPost);
router.post('/:postId/createComment', auths, createComment.createComment);
router.post('/likeComment/:commentId', auths, createComment.likeComment);
router.post('/dislikeComment/:commentId', auths, createComment.dislikeComment);
module.exports = router;
