import {addUser} from './../src/actions';
import store from './../src/store';
import expect from 'expect';

addUser('John', 45);

let state = store.getState();
let {users} = state;

describe('-- Store data types and values --', () => {
  test('should have the length of 2', () => {
    expect(users).toHaveLength(2);
  });

  test('should contain a specified user', () => {
    let u = users[1];
    expect(users).toContain(u);
  });

  test('should be an array', () => {
    expect(Array.isArray(users)).toBe(true);
  });
});
