const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '123',
      name: 'Test Name',
      room: 'Test Room'
    }, {
      id: '223',
      name: 'Just Name',
      room: 'Room Name'
    }, {
      id: '323',
      name: 'Name Again',
      room: 'Room Name'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Test Name',
      room: 'Test Room'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return user names in Room Name', () => {
    var usersList = users.getUserList('Room Name');

    expect(usersList).toEqual(['Just Name', 'Name Again']);
  });

  it('should return user names in Test Room', () => {
    var usersList = users.getUserList('Test Room');

    expect(usersList).toEqual(['Test Name']);
  });

  it('should remove a user', () => {
    const userId = '123';
    const removedUser = users.removeUser(userId);

    expect(removedUser.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it('should not remove user (bad id)', () => {
    const remainingUsers = users.removeUser('234324234');

    expect(remainingUsers).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  it('should find user', () => {
    const foundUser = users.getUser('123');

    expect(foundUser).toEqual(users.users[0]);
  });
  it('should not find user (bad id)', () => {
    const foundUser = users.getUser('456456');

    expect(foundUser).toBeFalsy();
  });
});