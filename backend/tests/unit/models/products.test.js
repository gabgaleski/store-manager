const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { getAllMock, getById } = require('../mocks/products.mock');

describe('Testa as funções de products', function () {
    it('Testa se é possivel pegar todos os produtos', async function () {
        sinon.stub(connection, 'execute').resolves([getAllMock]);
        const result = await productsModel.getAllProducts();

        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result).to.be.deep.equal(getAllMock);
    });

    it('Testa se é possivel pegar um produto pelo id', async function () {
        sinon.stub(connection, 'execute').resolves([[getById]]);
        const id = 1;
        const result = await productsModel.getProductById(id);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(getById);
    });

    it('Testa se é possivel criar um produto', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
        const name = 'Produto Teste';
        const result = await productsModel.createProduct(name);

        expect(result).to.be.an('object');
    });

    afterEach(function () {
        sinon.restore();
      });
});