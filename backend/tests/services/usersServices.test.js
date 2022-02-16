const sinon = require('sinon');
const { expect } = require('chai');

const usersModels = require('../../models/users');
const usersServices = require('../../services/users');

const payloadUser1 = {
  _id: '620ceffa81b4282df6440844',
  name: 'Usuário 1',
  password: '123456',
  role: 'admin',
  email: 'admin1@ebytr.com',
};

describe('Testing Users Services', () => {
  describe('create User', () => {
    describe('when we do not send all field', () => {
      it('return: "name" is not allowed to be empty', async () => {
        // para saber como capturar o erro retornado, foi consultado o código de um projeto realizado pelo Lucas Caribé
        // https://github.com/tryber/sd-013-c-store-manager/pull/80/
        try {
          await usersServices.create(
            '',
            payloadUser1.password,
            payloadUser1.role,
            payloadUser1.email,
          );
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"name" is not allowed to be empty');
        }
      });
      it('return: "password" is not allowed to be empty', async () => {
        try {
          await usersServices.create(
            payloadUser1.name,
            '',
            payloadUser1.role,
            payloadUser1.email,
          );
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"password" is not allowed to be empty');
        }
      });
      it('return: "role" is not allowed to be empty', async () => {
        try {
          await usersServices.create(
            payloadUser1.name,
            payloadUser1.password,
            '',
            payloadUser1.email,
          );
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"role" is not allowed to be empty');
        }
      });
      it('return: "email" is not allowed to be empty', async () => {
        try {
          await usersServices.create(
            payloadUser1.name,
            payloadUser1.password,
            payloadUser1.role,
            '',
          );
        } catch (error) {
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"email" is not allowed to be empty');
        }
      });
    });
    describe('when we send all fields', () => {
      before(() => {
        sinon.stub(usersModels, 'create')
          .resolves({ insertedId: payloadUser1._id });
      });

      after(() => {
        usersModels.create.restore();
      });

      it('returns an object with the insertedId field', async () => {
        const response = await usersServices.create(
          payloadUser1.name,
          payloadUser1.password,
          payloadUser1.role,
          payloadUser1.email,
        );
        expect(response).to.be.a('object');
        expect(response).to.have.a.property('insertedId');
      });
    });
  });
});
