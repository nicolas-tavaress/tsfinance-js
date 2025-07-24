import * as UserRepository from '../Repositories/User.js';
import * as UserModel from '../Models/User.js';
import UserDTO from '../DTOs/User.js';

function jsonResponse(res, status, data) {
  return res.status(status).json(data);
}

export const getAllUsers = async (req, res) => {
  const response = await UserRepository.getAllUsers();

  const users = response.body.users.map(user => new UserDTO(user));
  if (Object.keys(users) instanceof UserDTO) {
    return jsonResponse(res, 404, { error: 'No users found' });
  }

  return jsonResponse(res, response.status, users);
};

export const createUser = async (req, res) => {
  const user = new UserModel(req.body);

  if (!user.validateUserFields()) {
    return jsonResponse(res, 400, { error: 'Invalid user data' });
  }

  const repositoryResponse = await UserRepository.createUser(user);
  const createdUser = new UserDTO(UserRepository.getUserById(repositoryResponse.body.userId));

  if (!createdUser) {
    return jsonResponse(res, 500, { error: 'User creation failed' });
  }

  return jsonResponse(res, 201, createdUser);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const repositoryResponse = await UserRepository.getUserById(id);
  const userDto = new UserDTO(repositoryResponse.body.user[0]);

  if (!userDto) {
    return jsonResponse(res, 500, { error: 'User creation failed' });
  }

  return jsonResponse(res, 200, userDto);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = new UserModel.User(req.body);
  user.validateUserFields();

  const userExists = await UserRepository.getUserById(id);

  if (!userExists) {
    return jsonResponse(res, 404, { error: 'This user does not exist or has already been deleted' });
  }

  const updatedUser = await UserRepository.updateUser(id, user);
  return jsonResponse(res, 200, updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userExists = await UserRepository.getUserById(id);

  if (!userExists) {
    return jsonResponse(res, 404, { error: 'This user does not exist or has already been deleted' });
  }

  await UserRepository.deleteUser(id);
  return jsonResponse(res, 200, { message: 'User deleted successfully' });
};