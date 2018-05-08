const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      server = http.createServer(app),
      fs = require('fs'),
      port = process.env.PORT || 3000,
      socketIO = require('socket.io'),
      IO = socketIO(server),
      hbs = require('express-handlebars');

app.use(express.static(`${__dirname}/public`));

// config handlebars
app.set('views', `${__dirname}/public`);
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

// USER management

var users = [];

function update(){
  console.log("Current Users :\n", users);
}

function isThere(arr, target, item){
  var a;
  for(let x in arr){
    if(arr[x][target] === item){
      a = true;
      return a;
    } else {
      a = false;
    }
  }
  return a;
}

function addUser(u, cb) {
  let f = isThere(users, 'name', u);
  if(f){
    cb(false);
  } else {
    var toAdd = {
      name: u,
      id: users.length + 1,
      joinedAt: Date.now()
    }
    users.push(toAdd);
    console.log(`${u} joined the chat`);
    update();
    cb(true);
  } 
}

function remUser(name){
  let f = isThere(users, 'name', name);
  if(f){
    var newU = users.filter((u) => {
      return u.name != name
    });
    users = newU;
    console.log(`${name} left the chat`);
    update();
  }
}


IO.on('connection', (socket) => {
  IO.emit('update', users);
  let tempName;

  socket.on('join', (name) => {
    addUser(name, (s) => {
      if(s){
        socket.emit('join_success', name);
        tempName = name;
        IO.emit('update', users);
      } else {
        socket.emit('join_fail');
      }
    });
  });
  
  socket.on('disconnect', () => {
    remUser(tempName);
    IO.emit('update', users);
  });

});

// ROUTES HERE :

app.get('/err', (req, res) => {
  let {url} = req;
  let usedName;
  let errMsg = url.split('?msg=')[1];
  if(errMsg.includes('username_already_taken')){
    usedName = errMsg.split('?username=')[1];
    return res.send(`Username: ${usedName} is already in use. please choose another one`);
  } else if(errMsg.includes('choose_name')){
    return res.send("Please choose a name.\nYou need a name to play the game");
  }
});


server.listen(port, (err) => {
  if(err) return console.error(err);
  console.log(`Server is up on localhost:${port}`);
});
