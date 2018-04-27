import {createStore, compose} from 'redux';
import reducer from './../reducer';

const store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var updates = store.subscribe(() => {
  let state = store.getState();
  console.log('State :: ', state);
});

export default store;
