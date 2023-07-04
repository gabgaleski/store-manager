const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { validateProduct } = require('../../../src/services/validation/validationProductsUpdate');
const { validateIdDelete } = require('../../../src/services/validation/validationDeletId');
const { productsModel } = require('../../../src/models');

chai.use(sinonChai);

describe('Testa a validação de atualização de produtos', function () {
    it('Testa se falha ao tentar validar um produto sem o campo "name"', async function () {
        const req = {
            body: {},
            params: { id: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        await validateProduct(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Testa se falha ao tentar validar um produto com o campo "name" menor que 5 caracteres', async function () {
        const req = {
            body: { name: 'a' },
            params: { id: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        await validateProduct(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
    
    it('Testa se falha ao passar um id incorreto', async function () {
        const req = {
            body: { name: 'Produto' },
            params: { id: 99 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        sinon.stub(productsModel, 'getProductById').resolves(null);
        sinon.stub(productsModel, 'updateProduct').resolves({ id: 99, name: 'Produto' });

        await validateProduct(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Testa se da erro no delete ao passar id invalido', async function () {
        const req = {
            params: { id: 99 },
            body: {},
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        sinon.stub(productsModel, 'getProductById').resolves(null);
        sinon.stub(productsModel, 'deleteProduct').resolves({});

        await validateIdDelete(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
        sinon.restore();
      });
});