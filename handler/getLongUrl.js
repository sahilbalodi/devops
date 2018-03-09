const Models = require('../models');

module.exports = client => ({
  path: '/getLongUrl',
  method: 'GET',
  handler: (request, response) => {
    const { hash } = request.query;
    client.hget('Urls', hash, (err, result) => {
      if (err) {
        console.log(err);
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
});
