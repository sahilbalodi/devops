const Models = require('../models/');
const findOrCreateUrl = require('../helper/findOrCreateUrl');

describe('Testing the function that tries to insert a unique short url hash to the database', () => {
  beforeEach((done) => {
    Models.Urls.truncate().then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.Urls.truncate().then(() => {
      done();
    });
  });
  test('Should create a new URL entry for no conflicting entries in the DB', (done) => {
    findOrCreateUrl('Teststring', 0, 6).then((result) => {
      Models.Urls.findAll({
        where: {
          shorturl: result,
        },
      }).then((searchResult) => {
        expect(searchResult.length).toBe(1);
        done();
      });
    });
  });
  test('Should return short URL entry for existing entry in the DB', (done) => {
    findOrCreateUrl('Teststring', 0, 6).then((result) => {
      findOrCreateUrl('Teststring', 0, 6).then((shortUrl) => {
        Models.Urls.findOne({
          where: {
            shorturl: shortUrl,
          },
        }).then((searchResult) => {
          expect(searchResult.shorturl).toBe(result);
          done();
        });
      });
    });
  });
});
