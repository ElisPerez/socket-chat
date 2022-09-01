const { Router } = require('express');

const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { validateCreateProduct, validateGetProduct, validateUpdateProduct, validateDeleteProduct } = require('../validators');


const router = Router();

// {{url}}/api/products

router.post('/', validateCreateProduct, createProduct);

router.get('/', getProducts);

router.get('/:id', validateGetProduct, getProduct);

router.put('/:id', validateUpdateProduct, updateProduct);

router.delete('/:id', validateDeleteProduct, deleteProduct);

module.exports = router;