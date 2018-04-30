import {addUser, isThere} from './../src/actions';
import store from './../src/store';
import expect from 'expect';

addUser('John', 45);
addUser('chris', 23);

let state = store.getState();
let {users} = state;

describe('-- Store data types and values --', () => {
  test('should be an array', () => {
    expect(Array.isArray(users)).toBe(true);
  });

  test('should have the length of 3', () => {
    expect(users).toHaveLength(3);
  });

  test('should contain a specified user', () => {
    let u = users[1];
    expect(users).toContain(u);
  });
});

describe('-- Finding Actually works', () => {
  test('find in array of objects', () => {
    expect(isThere(users, 'name', 'chris')).toBe(true);
  });
});
