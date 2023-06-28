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

module.exports = {
    getAllProducts,
    getProductById,
};