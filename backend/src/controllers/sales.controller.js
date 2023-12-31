const { salesService } = require('../services');

const getAllProducts = async (_req, res) => {
    const products = await salesService.getAllProducts();
    
    return res.status(200).json(products);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const resolves = await salesService.getProductById(id);
    return res.status(resolves.status).json(resolves.data);
};

const createProduct = async (req, res) => {
    const arrObj = req.body;
    const { status, data } = await salesService.createProduct(arrObj);
    return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.deleteProduct(id);
    return res.status(status).json(data);
};

const updateProductQuantity = async (req, res) => {
    const { saleId, productId } = req.params;
    const quantityObj = req.body;
    const { status, data } = await salesService
    .updateProductQuantity(saleId, productId, quantityObj);
    return res.status(status).json(data);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProductQuantity,
};