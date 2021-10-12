import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../src/app';
import testDB from './testDB';

before('connecting to db', async () => {
  const connection = await createConnection(testDB as any);
  connection.runMigrations();
});

describe('Auth Controller', () => {
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
  it('logs-in and returns a token', done => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: 'test@test.com',
        password: '12345678',
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        global.token = res.body.token;
      })
      .expect(200, done);
  });
  describe('Protected Route', () => {
    it('responds with an error', done => {
      request(app).get('/me').expect(401, done);
    });
    it('responds with a json message', done => {
      request(app).get('/me').set('Authorization', `bearer ${global.token}`).expect(200, done);
    });
  });
});
