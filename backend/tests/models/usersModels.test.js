const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const { DB_NAME } = process.env;
const COLLECTION_NAME = 'users';

const { getConnection } = require('./mongoMockConnection');

const usersModels = require('../../models/users');

const payloadUser1 = {
  _id: '620ceffa81b4282df6440844',
  name: 'Usuário 1',
  password: '123456',
  role: 'admin',
  email: 'admin1@ebytr.com',
};

const payloadUser2 = {
  _id: '620ceffa81b4282df6440845',
  name: 'Usuário 2',
  password: '654321',
  role: 'admin',
  email: 'admin2@ebytr.com',
};

describe('Testing Users Models ', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).drop();
    await MongoClient.connect.restore();
  });

  describe('create User', () => {
    it('returns an object with the id of the created product', async () => {
      const responseUser = await usersModels.create(
        payloadUser1.name, payloadUser1.password, payloadUser1.role, payloadUser1.email,
      );
      expect(responseUser).to.be.a('object');
      expect(responseUser).to.have.a.property('insertedId');
    });
    it('the registered user must exist', async () => {
      await usersModels.create(
        payloadUser1.name, payloadUser1.password, payloadUser1.role, payloadUser1.email,
      );
      const responseUser = await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).findOne({ name: payloadUser1.name });
      expect(responseUser).to.be.not.null;;
      expect(responseUser.name).to.be.eq(payloadUser1.name);
      expect(responseUser.password).to.be.eq(payloadUser1.password);
      expect(responseUser.role).to.be.eq(payloadUser1.role);
      expect(responseUser.email).to.be.eq(payloadUser1.email);
    });
  });

  describe('get user by email', () => {
    before(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertMany([payloadUser2]);
    });

    describe('if the user does not exist', () => {
      it('return null', async () => {
        const responseUser = await usersModels.getUserByEmail('null@gmail.com');
        expect(responseUser).to.be.null;
      });
    });
    describe('if the user exist', () => {
      it('return user data', async () => {
        const responseUser = await usersModels.getUserByEmail(payloadUser2.email);
        expect(responseUser).to.be.not.null;
        expect(responseUser).to.deep.equal(payloadUser2);
      });
    });
    
  });

});
