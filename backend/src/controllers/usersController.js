const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  const users = await usersModel.getAll();
  return res.status(200).json(users);
};

const validadeUser = async (req, res) => {
  const user = await usersModel.validadeUser(req.query);
  const { password } = req.query;

  if (user.length === 0) {
    return res.status(404).json({ message: `This user does not exist` });
  }

  const passwordMatch = await bcrypt.compare(password, user[0].password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  delete user[0].password;

  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const createdUser = await usersModel.createUser(req.body);
  return res.status(201).json(createdUser);
};

module.exports = {
  getAll,
  validadeUser,
  createUser,
};
