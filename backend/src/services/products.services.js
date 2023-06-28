const { productsModel } = require('../models');

const getAllProducts = async () => {
    const products = await productsModel.getAllProducts();
    return products;
};

const getProductById = async (id) => {
    const product = await productsModel.getProductById(id);
    if (!product) return { status: 404, data: { message: 'Product not found' } };
    return { status: 200, data: product };
};

module.exports = {
    getAllProducts,
    getProductById,
};