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

// custom moduels :
const {users, addUser, remUser, update} = require('./user');


app.use(express.static(`${__dirname}/public`));

// config handlebars
app.set('views', `${__dirname}/public`);
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');




IO.on('connection', (socket) => {
  let tempName;

  socket.on('join', (name) => {
    addUser(name);
    tempName = name;
    socket.emit('update', users);
  });

  socket.on('disconnect', () => {
    remUser(tempName);
    socket.emit('update', users);
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
