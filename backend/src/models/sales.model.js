const camelize = require('camelize');
const connection = require('./connection');

const getAllProducts = async () => {
    const [products] = await connection.execute(
        `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
        FROM sales_products AS sp
        INNER JOIN sales AS s ON sp.sale_id = s.id
        ORDER BY sp.sale_id, sp.product_id;`,
    );
    return camelize(products);
};

const getProductById = async (id) => {
    const [product] = await connection
    .execute(
`SELECT sp.product_id, sp.quantity, s.date
    FROM sales_products AS sp
    INNER JOIN sales AS s ON sp.sale_id = s.id
    WHERE s.id = ?`, 
    [id],
    );
    return camelize(product);
};

const createSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP);',
    );
    return camelize(insertId);
};

const createProduct = async (id, productId, quantity) => {
    await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
        [id, productId, quantity],
    );
    return {
        productId,
        quantity,
    };
};

const deleteProduct = async (id) => {
    await connection.execute(
        'DELETE FROM sales WHERE id = ?;',
        [id],
    );
    return {};
};

const getSaleData = async (id) => {
    const [[saleData]] = await connection.execute(
        'SELECT date FROM sales WHERE id = ?;',
        [id],
    );
    return camelize(saleData.date);
};

const updateProductQuantity = async (saleId, productId, quantityObj) => {
    const { quantity } = quantityObj;
    await connection.execute(
        'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
        [quantity, saleId, productId],
    );

    const saleData = await getSaleData(saleId);

    return {
        date: saleData,
        productId: Number(productId),
        quantity,
        saleId: Number(saleId),
    };
};

module.exports = {
  getAllProducts,
  getProductById,
  createSale,
  createProduct,
  deleteProduct,
  updateProductQuantity,
  getSaleData,
};