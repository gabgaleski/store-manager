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

const createProduct = async (arrObj) => {
    const saleId = await salesModel.createSale();
    const saveData = await Promise.all(arrObj.map((item) => salesModel
    .createProduct(saleId, item.productId, item.quantity)));

    return { status: 201, data: { id: saleId, itemsSold: saveData } };
};

const deleteProduct = async (id) => {
    const product = await salesModel.deleteProduct(id);
    return { status: 204, data: product };
};

const updateProductQuantity = async (saleId, productId, quantityObj) => {
    const update = await salesModel.updateProductQuantity(saleId, productId, quantityObj);
    return { status: 200, data: update };
};

const getSaleData = async (saleId) => {
    const sale = await salesModel.getSaleData(saleId);
    return sale;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProductQuantity,
    getSaleData,
};