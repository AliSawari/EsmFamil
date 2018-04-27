import {createStore} from 'redux';
import reducer from './../reducer';

const store = createStore(reducer);

var updates = store.subscibe(() => {
  let state = store.getState();
  console.log('State :: ', state);
});

export default store;
