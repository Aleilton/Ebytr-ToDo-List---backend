const sinon = require('sinon');
const { expect } = require('chai');

const usersServices = require('../../services/users');
const usersControllers = require('../../controllers/users');

const payloadUser1 = {
  _id: '620ceffa81b4282df6440844',
  name: 'Usuário 1',
  password: '123456',
  role: 'admin',
  email: 'admin1@ebytr.com',
};

describe('Testing Users Services', () => {
  describe('create User', () => {
    describe('when the informed payload is valid ', () => {
      const res = {};
      const req = {};

      before(() => {
        req.body = {
          name: payloadUser1.name,
          password: payloadUser1.password,
          role: payloadUser1.role,
          email: payloadUser1.email,
        };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(usersServices, 'create').resolves(payloadUser1);
      });

      after(() => {
        usersServices.create.restore();
      });

      it('status is called with code 201 ', async () => {
        await usersControllers.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

    });

  });
});
