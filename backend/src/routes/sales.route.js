const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllProducts);
route.get('/:id', salesController.getProductById);

module.exports = route;