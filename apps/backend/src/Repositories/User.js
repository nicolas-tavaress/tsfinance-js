import { openDb } from '../Models/Database.js';
import { Http } from '../Helpers/Http.js';

export const getAllUsers = async () => {
  const db = await openDb('mysql');
  try {
    const [users] = await db.query('SELECT * FROM users');
    const response = Http.makeResponse(users.length > 0 ? Http.STATUS.OK : Http.STATUS.NOT_FOUND, { users });
    return response;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export const getUserById = async (id) => {
  const db = await openDb('mysql');
  try {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const status = user.length > 0 ? Http.STATUS.OK : Http.STATUS.NOT_FOUND;
    const response = Http.makeResponse(status, { user });
    return response;
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};

export const createUser = async (user) => {
  const db = await openDb('mysql');
  try {
    const [result] = await db.query('INSERT INTO users SET ?', user);

    if (result.affectedRows === 0) {
      throw new Error('User creation failed');
    }

    return Http.makeResponse(Http.STATUS.CREATED, { message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

export const updateUser = async (id, user) => {
  const db = await openDb('mysql');
  try {
    const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
    return Http.makeResponse(Http.STATUS.OK, { message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  const db = await openDb('mysql');
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return Http.makeResponse(Http.STATUS.OK, { message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};

export const emailExists = async (email) => {
  const db = await openDb('mysql');
  try {
    const [email] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return Http.makeResponse(Http.STATUS.OK, { exists: email.length > 0 });
  } catch (err) {
    console.error('Error checking email existence:', err);
    throw err;
  }
};

export const documentExists = async (document) => {
  const db = await openDb('mysql');
  try {
    const [document] = await db.query('SELECT * FROM users WHERE document = ?', [document]);
    return Http.makeResponse(Http.STATUS.OK, { exists: document.length > 0 });
  } catch (err) {
    console.error('Error checking document existence:', err);
    throw err;
  }
};