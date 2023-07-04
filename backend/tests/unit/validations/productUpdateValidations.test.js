const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { validateProduct } = require('../../../src/services/validation/validationProductsUpdate');

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
    
    afterEach(function () {
        sinon.restore();
      });
});