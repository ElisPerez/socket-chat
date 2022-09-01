const { request, response } = require('express');
const { Category } = require('../models');

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${categoryDB.name} already exists`,
    });
  }

  // Generate data for the new category
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json({
    msg: 'Category created',
    category,
  });
};

const getCategories = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).populate('user', 'name').skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.json(category);
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json({
    msg: 'Category updated',
    category,
  });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const categoryDeleted = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

  res.json({
    msg: 'Category deleted',
    categoryDeleted,
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
