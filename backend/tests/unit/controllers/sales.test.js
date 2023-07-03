const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesMock, salesByIdMock } = require('../mocks/sales.mock');

chai.use(sinonChai);

describe('Testa as funções de sales da camada Controllers', function () {
    it('Testa se é possivel pegar todos os sales', async function () {
        sinon.stub(salesService, 'getAllProducts').resolves(salesMock);
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesController.getAllProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesMock);
    });

    it('Testa se é possivel pegar um sale pelo id', async function () {
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returns(),
        };

        sinon.stub(salesService, 'getProductById').resolves(salesByIdMock);

        await salesController.getProductById(req, res);
    });

    afterEach(function () {
        sinon.restore();
      });
});