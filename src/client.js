const net = require('net');
const readline = require('readline');
const os = require('os');

function connect({ host, port }) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '[client] ',
        crlfDelay: Infinity
    });
    
    let isPrompting = true;

    rl.prompt();
    console.log('Opening connection...');

    const client = net.createConnection({ host, port }, handleConnection);
    client.on('data', handleServerMessage);
    client.on('end', handleServerDisconnected);
    client.on('error', handleError);

    process.on('SIGINT', () => {
        client.end();
    });
    
    function handleConnection() {
        rl.on('line', input => {
            if (input.toLowerCase() === 'exit') {
                console.log('[client] Closing connection...');
                client.end();
            } else {
                client.write(`${input}${os.EOL}`);
            }
            rl.prompt();
        });

        rl.on('close', () => {
            client.end();
        });
    }
    
    function handleServerMessage(data) {
        isPrompting = false;
        console.log(data.toString());
        isPrompting = true;

        if (isPrompting) {
            rl.prompt();
        }
    }
    
    function handleServerDisconnected() {
        console.log('Disconnected');
        rl.close();
    }

    function handleError(err) {
        if (err.code == 'ECONNRESET') {
            // silent
            return;
        }
        console.error('Error:', err.message);
    }
}

module.exports = { connect };
