const bcrypt = require('bcrypt-nodejs');
const Users = require('../models/usersModels');
const { generateAuthToken } = require('../services/authTokenService');

const SUCCESS = 201;
const SUCCESS200 = 200;
const SYSTEM_FAIL = 500;
// const FAIL = 404;
const UNAUTHORIZED = 401;

const addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let { password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(password, salt);
    const results = await Users.addUser(name, email, password, role);
    res.status(SUCCESS).json({ user: results.ops[0] });
  } catch (err) {
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const id = await Users.findUser.id;
  try {
    const token = generateAuthToken(id, email, role, password);
    res.status(SUCCESS200).json({ token });
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

module.exports = {
  addUser,
  login,
};