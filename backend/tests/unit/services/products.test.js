const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { getAllMock, getById, inputCreateProduct, outputCreateProduct } = require('../mocks/products.mock');

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
    
    it('Testa a função de criar produto', async function () {
        sinon.stub(productsModel, 'createProduct').resolves(outputCreateProduct);
        const result = await productsService.createProduct(inputCreateProduct);

        expect(result.data).to.be.deep.equal(outputCreateProduct);
        expect(result.status).to.be.equal(201);
    });

    it('Testa erro ao criar produto', async function () {
        sinon.stub(productsModel, 'createProduct').resolves(null);
        const inputError = {
            name: 'Didi',
        };
        const result = await productsService.createProduct(inputError);

        expect(result.status).to.be.equal(422);
    });

    afterEach(function () {
        sinon.restore();
      });
});