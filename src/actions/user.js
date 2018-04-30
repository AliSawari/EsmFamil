import store from './../store';

function dis(a){
  store.dispatch(a);
}

function addUser (name, age) {
  dis({
    type: 'ADD',
    user : {
      name: name,
      age: age
    }
  });
}

export {addUser};
