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
    .expect((res) => {
      res.body._id = '5b57d127923211248855977c';
      res.body.date = '2018-07-25T01:23:51.029Z';
    })
    .expect(200, responseObj, done);
  });
});

describe('GET /api/v1/messages/stations/:station_id', () => {
    it('responds with json messages for specific station', (done) => {
      const station_id = 58399

      const requestObj = {
        user_id: 'KmXfmlW827TjVd9fHIXelWmaSON2',
        station_id: 58399,
        station_city: 'Portland',
        name: 'Devin Mounts',
        message: 'Here we go!',
      };

      const responseObj = {
        ...requestObj,
        _id: 'test',
        date: '2018-07-25T01:23:51.029Z'
      };

      request(app)
        .get(`/api/v1/messages/stations/${station_id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
          res.body._id = 'test';
          res.body.date = '2018-07-25T01:23:51.029Z';
        })
        .expect(200 ,done);
    });
  });

  // describe('PUT /api/v1/messages/message_id', () => {
  //   it('responds with updated message', (done) => {
  //     const requestObj = {
  //       user_id: 'KmXfmlW827TjVd9fHIXelWmaSON2',
  //       station_id: 58399,
  //       station_city: 'Portland',
  //       name: 'Devin Mounts',
  //       message: 'Here we go!',
  //     };
      
  //     const responseObj = {
  //       user_id: 'KmXfmlW827TjVd9fHIXelWmaSON2',
  //       station_id: 58399,
  //       station_city: 'Portland',
  //       name: 'Devin Mounts',
  //       message: 'Lets try this...',
  //       _id: '5b57d127923211248855977c',
  //       date: '2018-07-25T01:23:51.029Z'
  //     };

  //     const updatedMessage = 'Lets try this...'
      
  //     request(app)
  //     .put(`/api/v1/messages/${responseObj._id}`)
  //     .send({
  //       _id: responseObj._id,
  //       message: updatedMessage
  //     })
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(res => {
  //       res.body._id = '5b57d127923211248855977c';
  //       res.body.date = '2018-07-25T01:23:51.029Z';
  //     })
  //     .expect(200, responseObj, done);
  //   });
  // });