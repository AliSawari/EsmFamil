var users = [];

function update(){
  console.log(users);
  return users;
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

function remUser(name){
  let f = isThere(users, 'name', name);
  if(f){
    var newU = users.filter((u) => {
      return u.name != name;
    });
    users = newU;
    console.log(`${name} left the chat`);
    update();
  }
}

module.exports = {users, addUser, remUser, update};