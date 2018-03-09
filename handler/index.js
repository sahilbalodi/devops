const ping = require('./ping');
const shortenUrl = require('./shortenUrl');
const longurl = require('./getLongUrl');

module.exports = redisClient => [].concat(ping, shortenUrl(redisClient), longurl(redisClient));
