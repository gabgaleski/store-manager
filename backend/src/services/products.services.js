const { productsModel } = require('../models');
const { validateNameMiddleware } = require('./validation/validationInputsName');

const getAllProducts = async () => {
    const products = await productsModel.getAllProducts();
    return products;
};

const getProductById = async (id) => {
    const product = await productsModel.getProductById(id);
    if (!product) return { status: 404, data: { message: 'Product not found' } };
    return { status: 200, data: product };
};

const createProduct = async (name) => {
    const error = validateNameMiddleware(name);
    if (error) return error;
    const product = await productsModel.createProduct(name);

    return { status: 201, data: product };
};

const updateProduct = async (id, nameObj) => {
    const product = await productsModel.updateProduct(id, nameObj);

    return { status: 200, data: product };
};

const deleteProduct = async (id) => {
    const product = await productsModel.deleteProduct(id);

    return { status: 204, data: product };
};

const searchProduct = async (q) => {
    const products = await productsModel.searchProduct(q);
    return { status: 200, data: products };
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};