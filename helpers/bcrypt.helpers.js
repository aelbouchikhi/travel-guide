const bcrypt = require("bcrypt");

exports.bcryptFunction = {
  async hashing(password) {
    return await bcrypt.hash(password, 10);
  },
  async compareHashingPass(password, passwordHashed) {
    return await bcrypt.compare(password, passwordHashed);
  },
};
