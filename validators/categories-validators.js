const { check } = require('express-validator');

const { isCategoryByIdExist } = require('../helpers/db-validator');
const { validateResult, validateJWT, isAdminRole } = require('../middlewares');

// CATEGORIES VALIDATORS.
const validateCreateCategory = [
  validateJWT,
  check('name', 'Name is required').exists().not().isEmpty(),
  validateResult,
];

const validateGetCategory = [
  check('id', 'Is Not a valid ID').isMongoId(),
  check('id').custom(isCategoryByIdExist),
  validateResult,
];

const validateUpdateCategory = [
  validateJWT,
  check('name', 'Name is required').exists().not().isEmpty(),
  check('id', 'Is Not a valid ID').isMongoId(),
  check('id').custom(isCategoryByIdExist),
  validateResult,
];

const validateDeleteCategory = [
  validateJWT,
  isAdminRole,
  check('id', 'Is Not a valid ID').isMongoId(),
  validateResult,
  check('id').custom(isCategoryByIdExist),
  validateResult,
];

module.exports = {
  validateCreateCategory,
  validateGetCategory,
  validateUpdateCategory,
  validateDeleteCategory,
};
