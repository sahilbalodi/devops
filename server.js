const Hapi = require('hapi');
const Models = require('./models');
const md5 = require('md5');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});
server.route([{
  path: '/ping',
  method: 'GET',
  handler: (request, response) => {
    response('pong');
  },
}, {
  path: '/thisisverylargeurl/{id}',
  method: 'GET',
  handler: (request, response) => {
    const { id } = request.params;
    function findOrCreateUrl(start) {
      const shorturl = md5(`/thisisverylargeurl/${id}`).substr(start, 6);
      Models.Urls
        .findOrCreate({ where: { shorturl }, defaults: { longurl: `/thisisverylargeurl/${id}` } })
        .spread((user, created) => {
          if (created === false) {
            if (user.longurl === `/thisisverylargeurl/${id}`) {
              response(user.shorturl);
            } else {
              findOrCreateUrl(start + 1);
              // const allUrls = [];
              // const allLongUrls = [];
              // Models.Urls.findAll().then((urls) => {
              //   urls.forEach((x) => {
              //     allUrls.push(x.shorturl);
              //     allLongUrls.push(x.longurl);
              //   });
              // });
              // let incrSubs = 0;
              // let shortURLInstance = user.shorturl;
              // if (allLongUrls.includes(`/thisisverylargeurl/${id}`)) {
              //   response('found');
              // } else {
              //   while (allUrls.includes(shortURLInstance)) {
              //     shortURLInstance = md5(`/thisisverylargeurl/${id}`).substr(incrSubs, 6);
              //     incrSubs += 1;
              //   }
              //   Models.Urls.create({ shorturl: shortURLInstance, longurl: `/thisisverylargeurl/${id}` }).then((result) => {
              //     response(result.shorturl);
              //   });
              // }
            }
          } else {
            response(shorturl);
          }
        });
    }
    findOrCreateUrl(0);
  },
}]);
if (!module.parent) {
  server.start((error) => {
    if (error) { throw error; }
    console.log('server started');
  });
}
module.exports = server;
