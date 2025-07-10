const bcrypt = require("bcrypt");


module.exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


module.exports.verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
