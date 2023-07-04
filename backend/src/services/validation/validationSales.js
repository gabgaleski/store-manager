const { getProductById } = require('../sales.services');

function validateSales(req, res, next) {
    const arrayObj = req.body;

    const validateProductId = arrayObj.every((obj) => obj.productId);
    const validateQuantity = arrayObj.every((obj) => obj.quantity);
    const validateMinQuantity = arrayObj.every((obj) => obj.quantity > 0);
    const isZero = arrayObj.some((obj) => obj.quantity === 0);

    if (!validateProductId) return res.status(400).json({ message: '"productId" is required' });
    if (!isZero && !validateQuantity) { 
        return res.status(400).json({ message: '"quantity" is required' }); 
    }
    if (!validateMinQuantity) {
    return res.status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' }); 
    }

  return next();
}

const validateProductId = async (req, res, next) => {
    const arrayObj = req.body;

    const validateId = await Promise.all(arrayObj.map((obj) => getProductById(obj.productId)));

    if (validateId.some((item) => item.status !== 200)) { 
        return res.status(404).json({ message: 'Product not found' }); 
    }

    next();
};

const validateDeletedSale = async (req, res, next) => {
    const { id } = req.params;
    const product = await getProductById(id);
    if (product.status !== 200) return res.status(404).json({ message: 'Sale not found' });

    next();
};

module.exports = {
    validateSales,
    validateProductId,
    validateDeletedSale,
};