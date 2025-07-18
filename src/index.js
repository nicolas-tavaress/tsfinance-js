const express = require('express');
const { User } = require('./models/userModel');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);

router.route('/users')
  .get( async (req, res) => {
    return res.json(await getAllUsers());
  })
  .post( async (req, res) => {
    const user = new User(req.body);
    try {
      user.validateUserFields();
      return res.json(await user.createUser(user));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

router.route('/users/:id')
  .get( async (req, res) => {
    const { id } = req.params;
    return res.json(await getUserById(id));
  })
  .put( async (req, res) => {
    const { id } = req.params;
    const user = new User(req.body);
    try {
      user.validateUserFields();
      return res.json(await user.updateUser(id, user));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  })