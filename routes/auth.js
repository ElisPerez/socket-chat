const { Router } = require('express');

const { login, googleSignIn } = require('../controllers/auth');
const { validateLogin, validateGoogleSignIn } = require('../validators');

const router = Router();

router.post('/login', validateLogin, login);

router.post('/google', validateGoogleSignIn, googleSignIn);

module.exports = router;
