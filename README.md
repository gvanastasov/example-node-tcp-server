# example-node-tcp-server
 Just a dummy example of a tcp server receiving and sending packets.

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