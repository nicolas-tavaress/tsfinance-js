import { openDb } from '../Models/Database.js';
import { Http } from '../Helpers/Http.js';

async function getUserById(id) {
  const db = await openDb('mysql');
  try {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const status = user.length > 0 ? Http.STATUS.OK : Http.STATUS.NOT_FOUND;
    return Http.makeResponse(status, { user: user[0] });
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
}

async function createUser(user) {
  const db = await openDb('mysql');
  try {
    const [result] = await db.query('INSERT INTO users SET ?', user);

    if (result.affectedRows === 0) {
      throw new Error('User creation failed');
    }

    return Http.makeResponse(Http.STATUS.CREATED, { message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}

async function getAllUsers() {
  const db = await openDb('mysql');
  try {
    const [users] = await db.query('SELECT * FROM users');
    return Http.makeResponse(Http.STATUS.OK, { users });
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
}

async function updateUser(id, user) {
  const db = await openDb('mysql');
  try {
    const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
    return Http.makeResponse(Http.STATUS.OK, { message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

async function deleteUser(id) {
  const db = await openDb('mysql');
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return Http.makeResponse(Http.STATUS.OK, { message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}

async function emailExists(email) {
  const db = await openDb('mysql');
  try {
    const [email] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return Http.makeResponse(Http.STATUS.OK, { exists: email.length > 0 });
  } catch (err) {
    console.error('Error checking email existence:', err);
    throw err;
  }
}

async function documentExists(document) {
  const db = await openDb('mysql');
  try {
    const [document] = await db.query('SELECT * FROM users WHERE document = ?', [document]);
    return Http.makeResponse(Http.STATUS.OK, { exists: document.length > 0 });
  } catch (err) {
    console.error('Error checking document existence:', err);
    throw err;
  }
}

export { getUserById, createUser, getAllUsers, updateUser, deleteUser, emailExists, documentExists };