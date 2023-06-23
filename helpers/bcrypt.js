const bcrypt = require("bcryptjs");

function hashPassword(password, option) {
  return bcrypt.hashSync(password, option);
}

function comparePassword(password, user) {
  return bcrypt.compareSync(password, user);
}

module.exports = { hashPassword, comparePassword };
