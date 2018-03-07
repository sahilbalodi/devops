const findOrCreateUrl = require('../helper/findOrCreateUrl');
const client = require('../redis');

module.exports = {
  path: '/getShortUrl',
  method: 'GET',
  handler: (request, response) => {
    const { url } = request.query;
    const value = findOrCreateUrl(url, 0, 6);
    value.then((returnedShortUrl) => {
      response(returnedShortUrl);
      client.hset('Urls', returnedShortUrl, url);
    });
  },
};
