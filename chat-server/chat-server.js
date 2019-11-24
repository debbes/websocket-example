const WebSocket = require('ws');

function create(httpServer) {
  const wsServer = new WebSocket.Server({server: httpServer});
  wsServer.on('connection', ws => {
    console.log('Someone connected')
    ws.on('message', data => {
      wsServer.clients.forEach(client => {
        client.send(data);
      });
    });
  });
}

module.exports = {
  create
};
