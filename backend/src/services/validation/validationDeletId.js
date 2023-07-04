const { getProductById } = require('../products.services');

const validateIdDelete = async (req, res, next) => {
    const { id } = req.params;

    const product = await getProductById(id);
    if (product.status !== 200) return res.status(404).json({ message: 'Product not found' });

    next();
};

module.exports = {
    validateIdDelete,
};