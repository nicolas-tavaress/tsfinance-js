import { openDb } from '../helpers/database.js';

openDb()

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function createUser(user) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, ...user });
      }
    });
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { getUserById, createUser, getAllUsers };