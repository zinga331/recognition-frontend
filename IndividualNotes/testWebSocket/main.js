const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 9900 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const msg = String.fromCharCode(...data);
    console.log("received: %s", msg);

    ws.send(`I heard you say "${msg}"`);
  });

  ws.send("Hello webSocket");
});