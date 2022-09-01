const { check } = require('express-validator');

const {
  isCategoryByIdExist,
  isProductByIdExist,
} = require('../helpers/db-validator');
const { validateResult, validateJWT, isAdminRole } = require('../middlewares');

// PRODUCTS VALIDATORS.
const validateCreateProduct = [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('category', 'Category require a valid MongoID').isMongoId(),
  check('category').custom(isCategoryByIdExist),
  validateResult,
];


const validateGetProduct = [
  check('id', 'Is Not a valid MongoID').isMongoId(),
  check('id').custom(isProductByIdExist),
  validateResult,
];

const validateUpdateProduct = [
  validateJWT,
  check('id', 'Id is required').exists().not().isEmpty(),
  check('name', 'Name is required').exists().not().isEmpty(),
  check('id').custom(isProductByIdExist),
  validateResult,
];

const validateDeleteProduct = [
  validateJWT,
  isAdminRole,
  check('id', 'Is Not a valid MongoId').isMongoId(),
  check('id').custom(isProductByIdExist),
  validateResult,
];

module.exports = {
  validateCreateProduct,
  validateGetProduct,
  validateUpdateProduct,
  validateDeleteProduct,
}