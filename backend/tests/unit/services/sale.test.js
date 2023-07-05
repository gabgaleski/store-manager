const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
    salesMock,
    salesByIdMock,
    registerSaleOutputMock,
    registerSaleInputMock,
  } = require('../mocks/sales.mock');

describe('Testa as funções de products da camada Services', function () {
    it('Testa se é possivel pegar todos os produtos', async function () {
        sinon.stub(salesModel, 'getAllProducts').resolves(salesMock);
        const result = await salesService.getAllProducts();

        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result).to.be.deep.equal(salesMock);
    });

    it('Testa se é possivel pegar produtos pelo id', async function () {
        sinon.stub(salesModel, 'getProductById').resolves(salesByIdMock);
        const id = 1;
        const { data, status } = await salesService.getProductById(id);

        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal(salesByIdMock);
    });

    it('Testa se da erro ao buscar uma venda inexistente', async function () {
        sinon.stub(salesModel, 'getProductById').resolves();
        const id = 999;
        const { data, status } = await salesService.getProductById(id);

        expect(status).to.be.equal(404);
        expect(data).to.be.deep.equal({ message: 'Sale not found' });
    });

    it('Testa se é possivel registrar uma venda', async function () {
        sinon.stub(salesModel, 'createSale').resolves(3);
        sinon.stub(salesModel, 'createProduct').resolves(registerSaleOutputMock[0]);
        const result = await salesService.createProduct(registerSaleOutputMock);

        expect(result).to.be.an('object');
        expect(result.data).to.be.deep.equal(registerSaleInputMock);
        expect(result.status).to.be.equal(201);
    });

    it('Testa se é possivel deletar uma venda', async function () {
        sinon.stub(salesModel, 'deleteProduct').resolves({});
        const result = await salesService.deleteProduct(1);

        expect(result).to.be.an('object');
        expect(result.data).to.be.deep.equal({});
        expect(result.status).to.be.equal(204);
    });

    it('Testa se é possivel dar update em quantity', async function () {
        sinon.stub(salesModel, 'updateProductQuantity').resolves({});
        const result = await salesService.updateProductQuantity(1, 1, { quantity: 2 });

        expect(result).to.be.an('object');
        expect(result.data).to.be.deep.equal({});
        expect(result.status).to.be.equal(200);
    });

    afterEach(function () {
        sinon.restore();
      });
});
