const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock, salesByIdMock, registerSaleOutputMock } = require('../mocks/sales.mock');

describe('Testa as funções de sales', function () {
    it('Testa se é possivel pegar todos os produtos', async function () {
        sinon.stub(connection, 'execute').resolves([salesMock]);
        const result = await salesModel.getAllProducts();

        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result).to.be.deep.equal(salesMock);
    });

    it('Testa se é possivel pegar vendas pelo id', async function () {
        sinon.stub(connection, 'execute').resolves([salesByIdMock]);
        const id = 1;
        const result = await salesModel.getProductById(id);

        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal(salesByIdMock);
    });

    it('Testa se é possivel registrar uma venda', async function () {
        sinon.stub(connection, 'execute').resolves([registerSaleOutputMock]);
        const result = await salesModel.createProduct(3, 1, 1);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(registerSaleOutputMock[0]);
    });

    it('Testa se é possivel deletar uma venda', async function () {
        sinon.stub(connection, 'execute').resolves([]);
        const result = await salesModel.deleteProduct(1);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({});
    });

    afterEach(function () {
        sinon.restore();
      });
});