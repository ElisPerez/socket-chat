const { check } = require('express-validator');

const { validateResult } = require('../middlewares');

// EMAIL AND PASSWORD AUTHENTICATION.
const validateLogin = [
  check('email', 'Email is required').exists().isEmail(),
  check('password', 'Password is required').exists().not().isEmpty(),
  validateResult,
];

// GOOGLE AUTHENTICATION.
const validateGoogleSignIn = [
  check('id_token', 'id_token is required').exists().not().isEmpty(),
  validateResult,
];

module.exports = {
  validateLogin,
  validateGoogleSignIn,
}