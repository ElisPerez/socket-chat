const { check } = require('express-validator');
const jwt = require('jsonwebtoken');

const { allowedCollections } = require('../helpers/db-validator');
const { validateResult, uploadFileValidator, validateJWT, isAdminRole } = require('../middlewares');
const user = require('../models/user');

const validateUploadFile = [validateJWT, isAdminRole, uploadFileValidator, validateResult];

const validateIDvsToken = async (req, res, next) => {
  const { collection, id } = req.params;
  const { uid } = jwt.verify(req.header('x-token'), process.env.SECRET_OR_PRIVATE_KEY);

  switch (collection) {
    case 'products':
      return next();
    case 'users':
      if (id !== uid) {
        return res.status(401).json({
          msg: 'You are trying to change another user photo. You can only update your profile picture. Invalid token',
        });
      }
      return next();
  }
};

const validateUpdatePicture = [
  validateJWT,
  validateIDvsToken,
  uploadFileValidator,
  check('id', 'Is Not a valid MongoID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateResult,
];

const validateGetPicture = [
  check('id', 'Is Not a valid MongoID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateResult,
];

module.exports = {
  validateUploadFile,
  validateUpdatePicture,
  validateGetPicture,
};
