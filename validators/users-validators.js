const { check } = require('express-validator');

const { isValidRole, isEmailExist, isUserByIdExist } = require('../helpers/db-validator');
const { validateResult, validateJWT, haveRole, isAdminRole } = require('../middlewares');

// USER VALIDATORS.

const validateCreateUser = [
  check('name', 'Name is required').exists().not().isEmpty(),
  check('password', 'Password should be at least 6 characters').exists().isLength({ min: 6 }),
  check('email', 'Email is not valid').exists().isEmail(),
  check('email').custom(isEmailExist),
  // check('role', 'Role is not valid').exists().isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isValidRole),
  validateResult,
];

const validateGetUsers = [
  validateJWT,
  isAdminRole,
  validateResult,
];

const validateUpdateUser = [
  check('id', 'Is Not a valid ID').isMongoId(),
  check('id').custom(isUserByIdExist),
  check('role').custom(isValidRole),
  validateResult,
];

const validateModifyUsers = [
  validateJWT,
  isAdminRole,
  validateResult,
];

const validateDeleteUser = [
  validateJWT,
  // isAdminRole,
  haveRole('ADMIN_ROLE', 'SELLER_ROLE'),
  check('id', 'Is Not a valid ID').isMongoId(),
  check('id').custom(isUserByIdExist),
  validateResult,
];

module.exports = {
  validateCreateUser,
  validateGetUsers,
  validateUpdateUser,
  validateModifyUsers,
  validateDeleteUser,
};
