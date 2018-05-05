import store from './../store';

function dis(a){
  store.dispatch(a);
}

function addUser (name, age) {
  dis({
    type: 'ADD_ONLINE',
    onlineUser : {
      name: name,
      age: age
    }
  });
}

function remUser (name){
  dis({
    type: 'REM_USER',
    user: name
  });
}

function updateOnline(users){
  dis({
    type: 'UPDATE_ONLINE',
    online: users
  });
}

export {addUser, remUser, updateOnline};
