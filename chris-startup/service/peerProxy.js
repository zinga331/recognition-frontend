const { WebSocketServer } = require('ws');
const uuid = require('uuid');

let connections = [];

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

function sendNotice(msg) {
    connections.forEach((c) => {
        c.ws.send(JSON.stringify({msg: msg}));
    });
}

module.exports = {
    peerProxy,
    sendNotice
};