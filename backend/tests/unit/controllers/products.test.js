const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { getAllMock } = require('../mocks/products.mock');

chai.use(sinonChai);

describe('Testa as funções de products da camada Controllers', function () {
    it('Testa se é possivel pegar todos os produtos', async function () {
        sinon.stub(productsService, 'getAllProducts').resolves(getAllMock);
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productsController.getAllProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(getAllMock);
    });

    afterEach(function () {
        sinon.restore();
      });
});
