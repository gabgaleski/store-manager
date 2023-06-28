const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { getAllMock, getById } = require('../mocks/products.mock');

describe('Testa a camada services', function () {
    it('Testa a função getAll', async function () {
        sinon.stub(productsModel, 'getAllProducts').resolves(getAllMock);
        const result = await productsService.getAllProducts();
        expect(result).to.be.deep.equal(getAllMock);
    });

    it('Testa a função getById', async function () {
        sinon.stub(productsModel, 'getProductById').resolves(getById);
        const ID_PRODUCT = 1;
        const getByIdSave = getById;
        const result = await productsService.getProductById(ID_PRODUCT);
        expect(result.data).to.be.deep.equal(getByIdSave);
        expect(result.status).to.be.equal(200);
    });
    
    afterEach(function () {
        sinon.restore();
      });
});