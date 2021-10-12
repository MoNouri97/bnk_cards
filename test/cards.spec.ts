import assert from 'assert';
import request from 'supertest';
import app from '../src/app';

describe('Cards Controller', () => {
  it('should creates a card and responds with 201', done => {
    request(app)
      .post('/api/v1/cards')
      .set('Authorization', `bearer ${global.token}`)
      .send({
        pan: '3530-1116-5558-6018',
      })
      .expect(201, done);
  });
  let cardId;

  it('should return a list of cards', done => {
    request(app)
      .get('/api/v1/cards')
      .set('Authorization', `bearer ${global.token}`)
      .expect(res => {
        assert.equal(res.body.count, 1);
        cardId = res.body.cards[0].id;
      })
      .expect(200, done);
  });

  it('delete the created card', done => {
    request(app)
      .delete('/api/v1/cards')
      .set('Authorization', `bearer ${global.token}`)
      .send({
        cards: [cardId],
      })
      .expect(200, done);
  });
});
