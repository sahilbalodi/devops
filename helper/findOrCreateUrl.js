const Models = require('../models');
const md5 = require('md5');

function findOrCreateUrl(url, start, length, client) {
  const shorturl = md5(url).substr(start, length);
  return Models.Urls.findOrCreate({ where: { shorturl }, defaults: { longurl: url } })
    .spread((user, created) => {
      if (created === false) {
        if (user.longurl === url) {
          return user.shorturl;
        }
        return findOrCreateUrl(url, start + 1, length, client);
      }
      return shorturl;
    });
}
module.exports = findOrCreateUrl;
