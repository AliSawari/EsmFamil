import {createStore} from 'redux';

var def = {
  users: [{
    name: 'ali',
    age: '123',
    createdAt: 45459822,
    id: 1
  }]
}

function someRed(state = def, action){
  switch(action.type){
    case 'ADD':
    return {
      ...state,
      users: [
        ...state.users,
        {
          ...action.user,
          id: state.users.length + 1
        }
      ]
    }
  }
}

var store = createStore(someRed);

store.subscribe(() => {
  let state = store.getState();
  console.log("state: \n",state);
});

function dis(o){
  store.dispatch(o);
}

function addUser(name, age){
  dis({
    type: 'ADD',
    user: {
      name: name,
      age: age,
      createdAt: Date.now()
    }
  });
}

addUser('Jalal',32);
addUser('Mohammad', 21);
addUser('Fazel', 35);
addUser('Ahmad',19);




// var users = [];
//
// function update(){
//   console.log(users);
// }
//
// function addUser(u) {
//   var toAdd = {
//     name: u,
//     id: users.length + 1,
//     joinedAt: Date.now()
//   }
//   users.push(toAdd);
//   console.log(`added ${u} to the db`);
//   update();
// }
//
// function find(name){
//   for(let x in users) {
//     if(name === users[x].name){
//       return true;
//     }
//   }
// }
//
// function remUser(name){
//   let f = find(name);
//   if(f){
//     var newU = users.filter((u) => {
//       return u.name != name;
//     });
//     users = newU;
//     console.log(`Removed ${name} from db`);
//     update();
//   }
// }
