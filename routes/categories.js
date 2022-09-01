const { Router } = require('express');

const {
  validateCreateCategory,
  validateGetCategory,
  validateUpdateCategory,
  validateDeleteCategory,
} = require('../validators');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const router = Router();

// Create a category - Private. Anyone with a valid token can create a category
router.post('/', validateCreateCategory, createCategory);

// Get all categories - Public
router.get('/', getCategories);

// Get a category - Public
router.get('/:id', validateGetCategory, getCategory);

// Update a category - Private. Anyone with a valid token can update a category
router.put('/:id', validateUpdateCategory, updateCategory);

// Delete a category - Admin. Only the admin can disable a category.
router.delete('/:id', validateDeleteCategory, deleteCategory);

module.exports = router;
