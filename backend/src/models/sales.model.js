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
    const [[product]] = await connection
    .execute(`SELECT sp.product_id, sp.quantity, s.date
    FROM sales_products AS sp
    INNER JOIN sales AS s ON sp.sale_id = s.id
    WHERE sp.product_id = ?`, [id]);
    return camelize(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};