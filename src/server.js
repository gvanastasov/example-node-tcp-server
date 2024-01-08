const net = require('net');
const os = require('os');

// NOTE: add more as you wish, example byte, json, other
const MODES = {
    PACKET: 'PACKET',
    LINE: 'LINE'
}

function createServer({
    hostname = 'localhost',
    echo = false,
    mode = MODES.PACKET
} = {}) {
    const server = net.createServer();
    server.on('connection', handleConnection);

    console.log('[server] created...')
    console.log('[server] running %s mode...', mode)
    
    function handleConnection(socket) {
        var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;  
        console.log('[%s] connected...', remoteAddress);
        
        socket.setEncoding('utf8');
        socket.on('data', onConnectionDataReceive);  
        socket.on('error', onConnectionError);
        socket.once('close', onConnectionClose);

        let buffer = '';

        function onConnectionDataReceive(data) {
            buffer += data.toString();

            switch (mode) {
                case MODES.LINE:
                    handleLineMode(buffer);
                    break;
                case MODES.PACKET:
                default:
                    handlePacketMode(buffer);
                    break;
            }

            if (echo) {
                socket.write(data);
            }
        }

        function onConnectionClose() {  
            console.log('[%s] connection closed.', remoteAddress);  
        }

        function onConnectionError(err) {
            console.log('[%s] connection error: %s', remoteAddress, err.message);  
        }

        function handleLineMode(buffer) {
            const lines = buffer.split(/\r?\n/);
            const incompleteLine = lines.pop(); // The last element may be an incomplete line

            for (const line of lines) {
                // Process each complete line
                console.log('[%s] connection line received: %j', remoteAddress, line);
            }

            buffer = incompleteLine || '';
        }

        function handlePacketMode(buffer) {
            console.log('[%s] connection packet received: %j', remoteAddress, line);
            buffer = '';
        }

        function sendMessage(socket, message) {
            socket.write(message + os.EOL);
        }

        sendMessage(socket, `[server] Connected to ${address().toString()}`);
    }

    const address = () => {
        let address = server.address();
        return {
            ...address,
            toString: () => `${address.address}:${address.port}`
        }
    }

    const defaultListeningCallback = (port) => {
        console.log(`[server] listening on ${hostname}:${port}${os.EOL}`);
    }

    return {
        listen: (port, callback) => server.listen(port, hostname, callback ?? defaultListeningCallback(port)),
        address,
    }
}

module.exports = { createServer, MODES };