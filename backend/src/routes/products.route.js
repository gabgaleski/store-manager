const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../services/validation/validationProductsUpdate');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductById);
route.post('/', productsController.createProduct);
route.put('/:id', validateProduct, productsController.updateProduct);

module.exports = route;