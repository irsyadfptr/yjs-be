const WebSocket = require('ws');
const http = require('http');
const { setupWSConnection } = require('y-websocket/bin/utils');

// Create a basic HTTP server
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Yjs WebSocket Server is running');
});

// Bind WebSocket server to HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (conn, req) => {
  // setupWSConnection handles all the Yjs sync logic automatically!
  setupWSConnection(conn, req, { gc: true });
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Yjs WebSocket server listening on ws://0.0.0.0:${PORT}`);
});