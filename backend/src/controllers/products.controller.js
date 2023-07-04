const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
    const products = await productsService.getAllProducts();
    
    return res.status(200).json(products);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.getProductById(id);
    return res.status(status).json(data);
};

const createProduct = async (req, res) => {
    const name = req.body;
    const { status, data } = await productsService.createProduct(name);
    return res.status(status).json(data);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const nameObj = req.body;
    const { status, data } = await productsService.updateProduct(id, nameObj);
    return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.deleteProduct(id);
    return res.status(status).json(data);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};