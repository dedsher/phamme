const db = require('../config/db');
const User = require('../models/userModel');

class UserRepository {
  getAllUsers() {
    return db.get('users').value();
  }

  getUserById(id: string) {
    return db.get('users').find({ id }).value();
  }

  createUser(user: User) {
    db.get('users').push(user).write();
    return user;
  }

  updateUser(id: string, user: User) {
    db.get('users').find({ id }).assign(user).write();
    return user;
  }

  deleteUser(id: string): void {
    db.get('users').remove({ id }).write();
  }
}

module.exports = UserRepository;
