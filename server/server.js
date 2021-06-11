const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9898);

const wsServer = new WebSocketServer({
    httpServer: server
});

// Normal Distribution With Min, Max
const normal_distribution_random = (min, max) => {
    let u = 0, v = 0;

    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()

    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1

    if (num > 1 || num < 0) 
        num = normal_distribution_random(min, max) // resample between 0 and 1 if out of range
    
    else {
        num = Math.pow(num, 1) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }

    return num
}

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    let interval = 0;
    let myInterval;

    const startInterval = () => {
        if (interval) {
            myInterval = setInterval(() => {
                connection.sendUTF(normal_distribution_random(35000, 45000));
            }, interval);
        }
    }

    const stopInterval = () => {
        clearInterval(myInterval);
      }

    connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      
      if (message.utf8Data.includes('setInterval')) {
        const messagesPerMinute = Number(message.utf8Data.split(':')[1]);
        interval = messagesPerMinute ? parseInt(1000 * 60 / messagesPerMinute) : 0;

        stopInterval();
        startInterval();
      }
    });

    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
