import {addUser, isThere} from './../src/actions';
import store from './../src/store';
import expect from 'expect';

addUser('John', 45);
addUser('chris', 23);

let state = store.getState();
let {online} = state;

describe('-- Store data types and values --', () => {
  test('should be an array', () => {
    expect(Array.isArray(online)).toBe(true);
  });

  test('should have the length of 2', () => {
    expect(online).toHaveLength(2);
  });

  test('should contain a specified user', () => {
    let u = online[1];
    expect(online).toContain(u);
  });
});

describe('-- Finding Actually works', () => {
  test('find in array of objects', () => {
    expect(isThere(online, 'name', 'chris')).toBe(true);
  });
});
