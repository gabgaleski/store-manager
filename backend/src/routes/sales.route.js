const route = require('express').Router();
const { salesController } = require('../controllers');
const {
    validateSales,
    validateProductId, 
    validateDeletedSale } = require('../services/validation/validationSales');

route.get('/', salesController.getAllProducts);
route.get('/:id', salesController.getProductById);
route.post('/', validateSales, validateProductId, salesController.createProduct);
route.delete('/:id', validateDeletedSale, salesController.deleteProduct);

module.exports = route;