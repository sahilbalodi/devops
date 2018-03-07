const ping = require('./ping');
const shortenUrl = require('./shortenUrl');
const longurl = require('./getLongUrl');

module.exports = [].concat(ping, shortenUrl, longurl);
