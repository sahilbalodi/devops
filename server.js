const Hapi = require('hapi');
const handler = require('./handler');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

server.route(handler);
if (!module.parent) {
  server.start((error) => {
    if (error) { throw error; }
    console.log('server started');
  });
}
module.exports = server;
