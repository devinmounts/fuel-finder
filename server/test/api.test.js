const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏' 
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with inserted message', (done) => {
    const requestObj = {
      user_id: 'KA9s',
      station_id: 3422,
      name: 'Devin',
      message: 'Here we go!',
    };

    const responseObj = {
      ...requestObj,
      _id: '5b57d127923211248855977c',
      date: '2018-07-25T01:23:51.029Z'
    };

    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body._id = '5b57d127923211248855977c';
        res.body.date = '2018-07-25T01:23:51.029Z';
      })
      .expect(200, responseObj, done);
  });
});