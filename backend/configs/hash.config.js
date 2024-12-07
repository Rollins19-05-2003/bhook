const bcrypt = require("bcrypt");
exports.hashPassword = (password) => {
  return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);
}
exports.comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}