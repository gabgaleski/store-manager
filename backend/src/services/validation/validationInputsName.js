const { validateName, validateMinName } = require('./schemas');

const validateNameMiddleware = (object) => {
    const { error: errorName } = validateName.validate(object);
    if (errorName) return { status: 400, data: { message: '"name" is required' } };

    const { error: errorMin } = validateMinName.validate(object);
    if (errorMin) {
        return { 
        status: 422, data: { message: '"name" length must be at least 5 characters long' }, 
        }; 
}
};

module.exports = {
    validateNameMiddleware,
};