const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      server = http.createServer(app),
      fs = require('fs'),
      port = process.env.PORT || 3000,
      socketIO = require('socket.io'),
      IO = socketIO(server);

app.use(express.static(`${__dirname}/public`));


IO.on('connection', (socket) => {
  console.log(`connected client`);
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, (err) => {
  if(err) return console.error(err);
  console.log(`Server is up on localhost:${port}`);
});
