const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../services/validation/validationProductsUpdate');
const { validateIdDelete } = require('../services/validation/validationDeletId');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductById);
route.post('/', productsController.createProduct);
route.put('/:id', validateProduct, productsController.updateProduct);
route.delete('/:id', validateIdDelete, productsController.deleteProduct);

module.exports = route;