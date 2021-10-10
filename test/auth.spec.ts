import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../src/app';
import testDB from './testDB';

before(async () => {
  const connection = await createConnection(testDB as any);
  connection.runMigrations();
});
describe('POST /api/v1/register', () => {
  it('responds with a json message', done => {
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

// describe('GET /api/v1/emojis', () => {
//   it('responds with a json message', done => {
//     request(app)
//       .get('/api/v1/emojis')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, ['😀', '😳', '🙄'], done);
//   });
// });
