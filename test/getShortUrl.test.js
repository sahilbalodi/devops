const server = require('../server');
const supertest = require('supertest');
const Models = require('../models');

beforeEach(() => Models.Urls.destroy({ truncate: true, cascade: true }));
afterEach(() => Models.Urls.destroy({ truncate: true, cascade: true }));
afterAll(() => Models.close());

describe('Testing the /getgShortUrl Url ', () => {
  it('testing if it returns statusCode 200', (done) => {
    const url = '/getShortUrl?url=www.facebook.com';
    supertest(server.listener).get(url).then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('testing if it returns error', (done) => {
    const url = '/getShortUrl?url=thisisverylargeurl0';
    supertest(server.listener).get(url).then((response) => {
      expect(response.text).toBe('f605c1');
      done();
    });
  });
});
