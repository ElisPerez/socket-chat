const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'Not any token provided',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(uid);

    // Validate if user exists
    if (!user) {
      return res.status(401).json({
        msg: 'User is not exists in data base',
      });
    }
    // Validate if user state is true
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token. User is not active',
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
