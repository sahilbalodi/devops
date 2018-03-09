const server = require('../server');
const supertest = require('supertest');

describe('Testing the /ping Url ', () => {
  it('testing if it returns statusCode 200', (done) => {
    const url = '/ping';
    supertest(server.listener).get(url).then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
