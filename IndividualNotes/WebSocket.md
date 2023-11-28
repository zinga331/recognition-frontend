# WebSocket Architecture

HTTP is based on a client-server architecture. This was useful for global document libaries connected by hyperlinks, but didn't work for notifications, distributed task processing, peer-to-pear communication, or other asynchronous events. Web developers created hasks to work around these limitations, like frequently pinging the server to see if there were any updates, or keeping client initiaded connections open for a long time as the client watied for some event to happen on the server. These hacks were inefficient and didn't scale well.

![WebSocket Upgrade](noteImages/webServicesWebSocketUpgrade.jpg)

in 2011 the communication protocol WebSocket was created to solve this problem. Its core feature is that it is duplex, meaning, after the initial connection is made from a client using vanilla HTTP, it is then upgraded by the server to a WebSocket connection. The relationship changes to a peer-to-peer connection where either party can efficiently send data at any time.

WebSocket connections are still only between two parties. So if you want to facilitate a conversation between a group of users, the server must act as the intermediary. Each peer first connects to the server, and then the server forwards messages amongst the peers.

![WebSocket Peers](noteImages/webServicesWebSocketPeers.jpg)

## Creating a WebSocket conversation

JavaScript running on a browser can initiate a WebSocket connection with the browser's WebSocket API. First you create a WebSocket object by specifying the port you want to communicate on.

You can then send messages with the `send` function, and register a callback using the `onmessage` function to receive messages.

```js
const socket = new WebSocket("ws://localhost:9900");

socket.onmessage = (event) => {
  console.log("received: ", event.data);
};

socket.send("I am listening");
```

The server uses the `ws` package to create a WebSocketServer that is listening on the same port the browser is using. By specifying a port when you create the WebSocketServer, you are telling the server to listen for HTTP connections on that port and to automatically upgrade them to a WebSocket connection if the request has a `connection: Upgrade` header.

When a connection is detected it calls the server's `on connection` callback. The server can then send messages with the `send` function, and register a callback using the `on message` function to receive messages.

```js
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
```

In a later instruction we will show you how to run and debug this example.
