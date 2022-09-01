const { User, Category, Product, Role } = require('../models');

// For custom validations

// Validate role exists
const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role ${role} is not registered in database`);
  }
};

// Validate email exists
const isEmailExist = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`Email ${email} is already registered in the database`);
    // return res.status(400).json({ msg: 'Email already exists' });
  }
};

// Validate user's id exists
const isUserByIdExist = async id => {
  const userExist = await User.findById(id);

  if (!userExist) {
    throw new Error(`User with id: ${id}, doesn't exist in the database`);
  }
};

// Validate category id exists
const isCategoryByIdExist = async id => {
  const categoryExist = await Category.findById(id);

  if (!categoryExist) {
    throw new Error(`Category with id: ${id}, doesn't exist in the database`);
  }
};

// Validate product id exists
const isProductByIdExist = async id => {
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new Error(`Product with id: ${id} doesn't exist in the database`);
  }
};


/**
 * If the collection is not included in the collections array, throw an error.
 * @param [collection] - The collection you want to check.
 * @param [collections] - The collections that are allowed to be queried.
 * @returns A function that takes a collection and a list of collections and returns true if the
 * collection is in the list of collections.
 */
const allowedCollections = (collection = '', collections = []) => {
  const isInclude = collections.includes(collection);
  if (!isInclude) {
    throw new Error(`Collection ${collection} is not allowed. Allowed collections are: ${collections.join(', ')}`);
  }
  return true;
}

module.exports = {
  isValidRole,
  isEmailExist,
  isUserByIdExist,
  isCategoryByIdExist,
  isProductByIdExist,
  allowedCollections,
};
