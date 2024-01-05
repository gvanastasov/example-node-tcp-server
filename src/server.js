const net = require('net');

const NL = '\r\n';

function createServer({
    hostname = 'localhost',
    echo = false,
} = {}) {
    const server = net.createServer();
    server.on('connection', handleConnection);

    function handleConnection(socket) {
        var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;  
        console.log(`new client connection from ${remoteAddress}`);
        
        socket.setEncoding('utf8');
        socket.on('data', onConnData);  
        socket.once('close', onConnClose);
        socket.on('error', onConnError);

        function onConnData(d) {  
            console.log('connection data from %s: %j', remoteAddress, d);
            if (echo) {
                socket.write(d);
            }
        }

        function onConnClose() {  
            console.log('connection from %s closed', remoteAddress);  
        }

        function onConnError(err) {
            console.log('Connection %s error: %s', remoteAddress, err.message);  
        }

        socket.write(`[server] > Connected to ${address().toString()}`);
        socket.write(NL);
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