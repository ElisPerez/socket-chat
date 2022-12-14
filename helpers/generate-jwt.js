const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('Could not generate token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = async (token = '') => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

    const user = await User.findById(uid);

    if (user) {
      if (user.state) {
        return user.toJSON();
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

module.exports = { generateJWT, checkJWT };
