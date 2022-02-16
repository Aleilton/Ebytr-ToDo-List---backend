const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../../index');

chai.use(chaiHttp);

const { expect } = chai;
const { getConnection } = require('../models/mongoMockConnection');
const { MongoClient } = require('mongodb');

const payloadUser1 = {
  _id: '620ceffa81b4282df6440844',
  name: 'Usuário 1',
  password: '123456',
  role: 'admin',
  email: 'admin1@ebytr.com',
};

describe('Create user endpoint', () => {
  let connectionMock;
  let response = {};

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('when user is not created successfully', () => {
    describe('when we do not send all field', () => {
      it('return: "name" is required', async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            password: payloadUser1.password,
            role: payloadUser1.role,
            email: payloadUser1.email,
          });
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.be.property('message');
        expect(response.body.message).to.be.equal('"name" is required');
      });
      it('return: "password" is required', async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: payloadUser1.name,
            role: payloadUser1.role,
            email: payloadUser1.email,
          });
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.be.property('message');
        expect(response.body.message).to.be.equal('"password" is required');
      });
      it('return: "role" is required', async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: payloadUser1.name,
            password: payloadUser1.password,
            email: payloadUser1.email,
          });
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.be.property('message');
        expect(response.body.message).to.be.equal('"role" is required');
      });
      it('return: "email" is required', async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: payloadUser1.name,
            password: payloadUser1.password,
            role: payloadUser1.role,
          });
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.be.property('message');
        expect(response.body.message).to.be.equal('"email" is required');
      });
    });
  });

  describe('when user is created successfully', () => {
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: payloadUser1.name,
          password: payloadUser1.password,
          role: payloadUser1.role,
          email: payloadUser1.email,
        });
    });

    it('return status code 201', () => {
      expect(response).to.have.status(201);
    });
    it('return a object', () => {
      expect(response.body).to.be.a('object');
    });
    it('return object has "userId" property ', () => {
      expect(response.body).to.be.property('userId');
    });
  });

  describe('possible to register a new user with an email already registered', () => {
    let responseEmail = {};
    before(async () => {
      responseEmail = await chai.request(server)
        .post('/users')
        .send({
          name: payloadUser1.name,
          password: payloadUser1.password,
          role: payloadUser1.role,
          email: payloadUser1.email,
        });
    });
    it('retorna um erro com o status 409', () => {
      expect(responseEmail).to.have.status(409);
    });
    it('retorna um objeto com a propriedade "message" e o valor "Email already registered"', () => {
      expect(responseEmail.body).to.be.a('object');
      expect(responseEmail.body).to.be.property('message');
      expect(responseEmail.body.message).to.be.equal('Email already registered');
    });
  });
});
