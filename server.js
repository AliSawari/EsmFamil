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


var users = [];

function update(){
  console.log(users);
}

function addUser(u) {
  var toAdd = {
    name: u,
    id: users.length + 1,
    joinedAt: Date.now()
  }
  users.push(toAdd);
  console.log(`${u} joined the chat`);
  update();
}

function find(name){
  for(let x in users) {
    if(name === users[x].name){
      return true;
    }
  }
}

function remUser(name){
  let f = find(name);
  if(f){
    var newU = users.filter((u) => {
      return u.name != name;
    });
    users = newU;
    console.log(`${name} left the chat`);
    update();
  }
}



IO.on('connection', (socket) => {
  let tempName;

  socket.on('join', (name) => {
    addUser(name);
    tempName = name;
  });

  socket.on('disconnect', () => {
    remUser(tempName);
  });

  setInterval(() => {
    socket.emit('update', users);
  }, 500);
});

// ROUTES HERE :

app.get('/err', (req, res) => {
  res.status(400).send('<h1>YOU MUST CHOOSE A NAME</h1>');
});


server.listen(port, (err) => {
  if(err) return console.error(err);
  console.log(`Server is up on localhost:${port}`);
});
