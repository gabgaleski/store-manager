const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock, salesByIdMock } = require('../mocks/sales.mock');

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

    afterEach(function () {
        sinon.restore();
      });
});