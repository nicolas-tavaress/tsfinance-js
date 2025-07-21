import express from 'express';
import * as UserRepository from './Repositories/User.js';
import * as UserModel from './Models/User.js';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);


router.route('/users')
  .get( async (req, res) => {
    try {
      const users = await UserRepository.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  })
  .post( async (req, res) => {
    const user = new UserModel.User(req.body);
    try {
      user.validateUserFields();
      const createdUser = await UserRepository.createUser(user);
      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });


router.route('/users/:id')
  .get( async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserRepository.getUserById(id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  })
  .put( async (req, res) => {
    const { id } = req.params;
    try {
      const user = new UserModel.User(req.body);
      user.validateUserFields();

      const userExists = await UserRepository.getUserById(id);

      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updatedUser = await UserRepository.updateUser(id, user);
      return res.json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  })
  .delete( async (req, res) => {
    const { id } = req.params;
    try {
      const userExists = await UserRepository.getUserById(id);

      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      await UserRepository.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;