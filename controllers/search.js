const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Category, Product, User } = require('../models');

const allowedCollections = ['categories', 'products', 'roles', 'users'];

const userSearch = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      result: user ? [user] : [],
    });
  }

  // Regular expression. Notes in './controllers/README.md'
  const regex = new RegExp(term, 'i');

  const count = await User.count({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({
    result: {
      count,
      users,
    },
  });
};

const categorySearch = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      result: category ? [category] : [],
    });
  }

  // Regular expression. Notes in './controllers/README.md'
  const regex = new RegExp(term, 'i');

  const count = await Category.count({ name: regex, state: true });

  const categories = await Category.find({ name: regex, state: true });

  res.json({
    result: {
      count,
      categories,
    },
  });
};

const productSearch = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({
      result: product ? [product] : [],
    });
  }

  // Regular expression. Notes in './controllers/README.md'
  const regex = new RegExp(term, 'i');

  const count = await Product.count({ name: regex, state: true });

  const products = await Product.find({ name: regex, state: true }).populate('category', 'name');

  res.json({
    result: {
      count,
      products,
    },
  });
};

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `${collection} is not a valid collection. Allowed collections: ${allowedCollections.join(
        ', '
      )}`,
    });
  }

  switch (collection) {
    case 'categories':
      categorySearch(term, res);
      break;
    case 'products':
      productSearch(term, res);
      break;
    case 'users':
      userSearch(term, res);
      break;
    default:
      return res.status(500).json({
        msg: 'I forgot to add the search functionality for this collection. Please, contact me. Thanks! Sincerely, the developer of this API. 😉',
      });
  }
};

module.exports = {
  search,
};
