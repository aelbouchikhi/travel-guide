require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORTSERVER || 7500,
  },
  secretKeyJwt : {
    secretKey: process.env.SECRET_KEY,
  }
};
