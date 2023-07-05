const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validationSales = require('../../../src/services/validation/validationSales');
const { salesModel } = require('../../../src/models');

chai.use(sinonChai);

describe('Testa as funções de validação da rota sales', function () {
    it('Testando se o productId é obrigatório', function () {
        const req = {
            body: [
                {
                    productId: '',
                    quantity: 1,
                },
            ],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        validationSales.validateSales(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Testando se o quantity é obrigatório', function () {
        const req = {
            body: [
                {
                    productId: 1,
                    quantity: '',
                },
            ],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        validationSales.validateSales(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Testando se o quantity é maior que 0', function () {
        const req = {
            body: [
                {
                    productId: 1,
                    quantity: 0,
                },
            ],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        validationSales.validateSales(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Testa se da erro ao passar id invalido no post', async function () {
        const req = {
            body: [
                {
                    productId: 99,
                    quantity: 1,
                },
            ],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        sinon.stub(salesModel, 'getProductById').resolves(null);

        await validationSales.validateProductId(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Testa se da erro ao passar id invalido no delete', async function () {
        const req = {
            params: { id: 99 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        sinon.stub(salesModel, 'getProductById').resolves(null);

        await validationSales.validateDeletedSale(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Testa ao nao passar a propriedade quantity corretamente no patch', async function () {
        const req = {
            body:
                {
                    quantit: '',
                },
            params: { productId: 1, saleId: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        await validationSales.validateUpdateSale(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Testa ao passar um productId invalido no patch', async function () {
        const req = {
            body:
                {
                    quantity: 1,
                },
            params: { productId: 99, saleId: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        sinon.stub(salesModel, 'getProductById').resolves(null);

        await validationSales.validateUpdateSale(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
    });

    afterEach(function () {
        sinon.restore();
      });
});