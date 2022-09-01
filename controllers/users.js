const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

// ? ::CRUD:: Create, Read, Update, Delete.
// POST: Create
const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt password
  const salt = bcryptjs.genSaltSync(); // default 10
  user.password = bcryptjs.hashSync(password, salt);

  // Save user
  await user.save();

  res.json({
    user,
  });
};

// GET: Read
const getUsers = async (req = request, res = response) => {
  // Pagination of users
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };
  // const query = { state: true, role: 'ADMIN_ROLE' };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    /* Return the total number of users. Number */
    total,
    /* Return a collection of users. Array */
    users,
  });
};

// PUT: Update/Replace
const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  // validate with database
  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync(); // default 10
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(updatedUser);
};

// PATCH: Update/Modify
const modifyUser = (req = request, res = response) => {
  res.json({
    msg: 'This is an example of PATCH request ~ controller/users.js',
  });
};

// ! DEL: Delete
const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { state: false }, { new: true });
  res.json(user);
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  modifyUser,
  deleteUser,
};
