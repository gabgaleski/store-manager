const connection = require('./connection');

const getAllProducts = async () => {
    const [products] = await connection.execute(
        'SELECT * FROM products',
    );
    return products;
};

const getProductById = async (id) => {
    const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product;
};

const createProduct = async (nameObj) => {
    const { name } = nameObj;
    const [{ insertId }] = await connection.execute(
        'INSERT INTO products (name) VALUES (?)',
        [name],
    );
    return { id: insertId, name };
};

const updateProduct = async (id, nameObj) => {
    const { name } = nameObj;
    await connection.execute(
        'UPDATE products SET name = ? WHERE id = ?',
        [name, id],
    );
    return { id: Number(id), name };
};

const deleteProduct = async (id) => {
    await connection.execute(
        'DELETE FROM products WHERE id = ?',
        [id],
    );
    return {};
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};