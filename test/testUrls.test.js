const Models = require('../models/');

beforeEach(() => Models.Urls.destroy({ truncate: true, cascade: true }));
afterEach(() => Models.Urls.destroy({ truncate: true, cascade: true }));
afterAll(() => Models.close());

describe('Testing the Urls model', () => {
  it('testing if table returns the inserted sample object', (done) => {
    const sampleUser = {
      longurl: 'http://www.facebooklogin.com',
      shorturl: 'abcd12',
    };
    Models.Urls.create(sampleUser).then(() =>
      Models.Urls.find().then((result) => {
        expect(result.shorturl).toBe(sampleUser.shorturl);
        expect(result.longurl).toBe(sampleUser.longurl);
        done();
      })).catch(err => console.log(err));
  });
});
