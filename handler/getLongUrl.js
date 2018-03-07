const Models = require('../models');
const client = require('../redis');

module.exports = {
  path: '/getLongUrl',
  method: 'GET',
  handler: (request, response) => {
    const { hash } = request.query;
    client.hget('Urls', hash, (err, result) => {
      if (err) {
        Models.Urls.findOne({ where: { shorturl: hash } }).then((record) => {
          if (record === null) {
            response('longurl not found');
          }
          response(record.longurl);
        });
      } else {
        response(result);
      }
    });
  },
};
