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

describe('GET /api/v1/messages/:station_id', () => {
  it('responds with a json message for specific station', (done) => {
    request(app)
      .get(`/api/v1/messages/${station_id}`)
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
      user_id: 'KmXfmlW827TjVd9fHIXelWmaSON2',
      station_id: 58399,
      station_city: 'Portland',
      name: 'Devin Mounts',
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