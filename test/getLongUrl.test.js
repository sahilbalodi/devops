const server = require('../server');
const supertest = require('supertest');

describe('Testing the /getLongUrl Url ', () => {
  it('testing if it returns statusCode 200', (done) => {
    const url = '/getLongUrl?hash=f605c1';
    supertest(server.listener).get(url).then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('testing if it returns longurl', (done) => {
    const url = '/getLongUrl?hash=f605c1';
    supertest(server.listener).get(url).then((response) => {
      expect(response.text).toBe('thisisverylargeurl0');
      done();
    });
  });
});
