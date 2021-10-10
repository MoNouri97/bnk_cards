import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../src/app';
import testDB from './testDB';

before(async () => {
  const connection = await createConnection(testDB as any);
  connection.runMigrations();
});
describe('Register', () => {
  it('creates a user and responds with 201', done => {
    request(app)
      .post('/api/v1/register')
      .send({
        fullName: 'Testing',
        email: 'test@test.com',
        password: '12345678',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});

let token = '';
describe('Login', () => {
  it('returns a token', done => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: 'test@test.com',
        password: '12345678',
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        token = res.body.token;
      })
      .expect(200, done);
  });
});

describe('Protected Route', () => {
  it('responds with an error', done => {
    request(app).get('/protected').expect(401, done);
  });
  it('responds with a json message', done => {
    request(app)
      .get('/protected')
      .set('Authorization', `bearer ${token}`)
      .expect(200, done);
  });
});
