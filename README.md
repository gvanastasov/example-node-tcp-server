# example-node-tcp-server
 Just a dummy example of a tcp server receiving and sending packets, as well as a client socket connecting and doing the same.

## Options

- `hostname` - server name on the network, defaults to localhost for the loop-back interface that is mapped to 127.0.0.1
- `echo` - setup the server to echo back the data sent from the client
- `mode` - switch betwen two example modes of handling data received, either packets or buffered lines (for example cmd server)

## Usage

1. Create server instance
2. Listen for streams on the binding interface

```js
const tcp = require('../src/index.js');

const server = tcp.createServer();
server.listen(3000);
```

3. Create a connection socket
4. Send messages via prompt

```js
const tcp = require('../src/index.js');

tcp.connect({ host: 'localhost', port: 3000 });
```

> can exit the terminal by either typing `exit` or by terminating (ctrl+c for Windows)

## Testing

1. Telnet

```sh
# connect
telnet localhost 3000

# Windows: Ctrl + ] to enter telnet client

# check connection
telnet> status
## Connected to localhost

# send data packets
telnet> send something

# or close the telnet prompt and go back to the session and start typing
something

# Windows: Ctrl + ] to enter telnet client
# disconnect
telnet> close

# quit
telnet> quit
```

2. Client Socket - just check `Usage > pt.3` above.
