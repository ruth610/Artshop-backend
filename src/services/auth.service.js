const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { secret, expiresIn } = require('../config/jwt');

exports.signup = async ({ username, email, password }) => {
  const existing = await User.findOne({ where: { username } });
  if (existing) {
    throw new Error('User already exists');
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  return user;
};

exports.login = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const payload = {
    sub: user.id,
    username: user.username,
    roles: user.roles,
  };

  const token = jwt.sign(payload, secret, { expiresIn });
  return { accessToken: token };
};
