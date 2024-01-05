const net = require('net');

const NL = '\r\n';

function createServer({
    hostname = 'localhost',
} = {}) {
    const server = net.createServer();
    server.on('connection', handleConnection);

    function handleConnection(socket) {
        socket.write(`[server] > Connected to ${address().toString()}`);
        socket.write(NL);
        socket.pipe(socket);
    }

    const address = () => {
        let address = server.address();
        return {
            ...address,
            toString: () => `${address.address}:${address.port}`
        }
    }

    return {
        listen: (port, callback) => server.listen(port, hostname, callback),
        address,
    }
}

module.exports = { createServer };