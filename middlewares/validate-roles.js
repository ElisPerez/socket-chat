const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to validate the role without validating the token first',
    });
  }

  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `Name: ${name}, you aren't an admin - Cannot do this action`,
    });
  }
  next();
};

const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'You want to validate the role without validating the token first',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `You don't have the role to do this action. You have: ${req.user.role} - You need to have one of these roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  haveRole,
};
