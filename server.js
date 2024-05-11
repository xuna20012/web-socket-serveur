const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        // Vous pouvez ici décider de renvoyer le message à tous les clients connectés
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

console.log(`WebSocket server started on wss://web-socket-serveur.onrender.com:8080`);
