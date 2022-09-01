[HTTP Status code](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

## validate-fields.js

- Fer Mode:
```
const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = { validateResult };
```




This code is more explicit:
```
const { check } = require('express-validator');
const { validateResult } = require('../../helpers/validateFields');

const validateCreate = [
  check('name', 'Name is required').exists().not().isEmpty(),
  check('password', 'Password should be at least 6 characters').exists().isLength({ min: 6 }),
  check('email', 'Email is not valid').exists().isEmail(),
  check('role', 'Role is not valid').exists().isIn(['ADMIN_ROLE', 'USER_ROLE']),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = { validateCreate };
```

but this is implicit:
```
const { check } = require('express-validator');
const { validateResult } = require('../../helpers/validateFields');

const validateCreate = [
  check('name', 'Name is required').exists().not().isEmpty(),
  check('password', 'Password should be at least 6 characters').exists().isLength({ min: 6 }),
  check('email', 'Email is not valid').exists().isEmail(),
  check('role', 'Role is not valid').exists().isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validateResult,
];

module.exports = { validateCreate };
```

