const AuthValidators = require('./auth-validators');
const CategoriesValidators = require('./categories-validators');
const ProductsValidators = require('./products-validators');
const UploadValidators = require('./upload-validators');
const UsersValidators = require('./users-validators');

module.exports = {
  ...AuthValidators,
  ...CategoriesValidators,
  ...ProductsValidators,
  ...UploadValidators,
  ...UsersValidators,
};
