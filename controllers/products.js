const { request, response } = require('express');
const { Product } = require('../models');

const createProduct = async (req = request, res = response) => {
  const { state, user, ...body } = req.body;

  const nameUpper = body.name.toUpperCase();

  const productDB = await Product.findOne({ name: nameUpper });

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${productDB.name}, already exists`,
      productDB,
    });
  }

  // Generate the data to save
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  // Save in DB
  await product.save();

  res.status(201).json(product);
};

const getProducts = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

  res.json(product);
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  // Validate if the product Name exists
  const nameUpper = data.name.toUpperCase();
  const productExist = await Product.findOne({ name: nameUpper });
  if (productExist) {
    return res.status(400).json({
      msg: `There is another product with the Name: ${productExist.name}. Please, change the name of the product. Duplicate names are not allowed.`,
      productExist,
    });
  }

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json({
    msg: 'Product updated',
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

  res.json({
    msg: 'Product deleted',
    productDeleted,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
