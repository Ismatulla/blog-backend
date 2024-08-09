const express = require('express');
const router = express.Router();
const auth = require('../controllers/register')
const auths = require('../middleware/userMiddleware')

router.post('/login', auth.login);
router.post('/register', auth.register);

router.get('/test', auths, (req, res) => {
  res.send('test');
})
module.exports = router;

