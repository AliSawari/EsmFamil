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
  console.log(`added ${u} to the db`);
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
    console.log(`Removed ${name} from db`);
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
});

server.listen(port, (err) => {
  if(err) return console.error(err);
  console.log(`Server is up on localhost:${port}`);
});
