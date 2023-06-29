const { salesModel } = require('../models');

const getAllProducts = async () => {
    const products = await salesModel.getAllProducts();
    return products;
};

const getProductById = async (id) => {
    const product = await salesModel.getProductById(id);
    if (!product || product.length < 1) return { status: 404, data: { message: 'Sale not found' } };
    return { status: 200, data: product };
};

module.exports = {
    getAllProducts,
    getProductById,
};