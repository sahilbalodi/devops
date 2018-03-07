const Models = require('../models');
const md5 = require('md5');

function findOrCreateUrl(url, start, length) {
  const shorturl = md5(url).substr(start, length);

  return Models.Urls.findOrCreate({ where: { shorturl }, defaults: { longurl: url } })
    .spread((user, created) => {
      if (created === false) {
        if (user.longurl === url) {
          return user.shorturl;
        }
        return findOrCreateUrl(start + 1, length);
      }
      return shorturl;
    });
}
module.exports = findOrCreateUrl;
