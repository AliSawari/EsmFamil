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

function updateOnline(users){
  dis({
    type: 'UPDATE_ONLINE',
    online: users
  });
}

export {addUser, updateOnline};
