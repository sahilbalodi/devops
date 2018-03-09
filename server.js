const Hapi = require('hapi');
const handler = require('./handler');
const client = require('./redis');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

server.route(handler(client));
if (!module.parent) {
  server.start();
}
module.exports = server;
