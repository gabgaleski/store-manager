const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validationSales = require('../../../src/services/validation/validationSales');

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

    afterEach(function () {
        sinon.restore();
      });
});