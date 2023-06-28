const { salesService } = require('../services');

const getAllProducts = async (_req, res) => {
    const products = await salesService.getAllProducts();
    
    return res.status(200).json(products);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.getProductById(id);
    return res.status(status).json(data);
};

module.exports = {
    getAllProducts,
    getProductById,
};