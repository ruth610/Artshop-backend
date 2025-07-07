const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

exports.isAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.roles.includes('admin')) return next();
  return res.status(403).json({ message: 'Admin only' });
};
