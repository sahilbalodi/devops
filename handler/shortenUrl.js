const findOrCreateUrl = require('../helper/findOrCreateUrl');

module.exports = client => ({
  path: '/getShortUrl',
  method: 'GET',
  handler: (request, response) => {
    const { url } = request.query;
    const value = findOrCreateUrl(url, 0, 6, client);
    value.then((returnedShortUrl) => {
      response(returnedShortUrl);
      client.hset('Urls', returnedShortUrl, url);
    });
  },
});
