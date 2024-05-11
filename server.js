const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;  // Utilisation d'une variable d'environnement avec un fallback

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // Renvoi du message à tous les clients connectés sauf l'expéditeur
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', function () {
        console.log('Client has disconnected!');
    });
});

console.log(`WebSocket server started on port ${PORT}`);
