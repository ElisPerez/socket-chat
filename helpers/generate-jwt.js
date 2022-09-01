const jwt = require('jsonwebtoken');

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

module.exports = { generateJWT };
