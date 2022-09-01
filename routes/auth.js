const { Router } = require('express');

const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares');
const { validateLogin, validateGoogleSignIn } = require('../validators');

const router = Router();

router.post('/login', validateLogin, login);

router.post('/google', validateGoogleSignIn, googleSignIn);

router.get('/', validateJWT, renewToken)

module.exports = router;
