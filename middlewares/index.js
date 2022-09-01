const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const uploadFileValidator = require('./validate-upload-file');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
  ...uploadFileValidator,
}