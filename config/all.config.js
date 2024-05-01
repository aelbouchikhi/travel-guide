require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORTSERVER || 7500,
    API_KEY: process.env.RAPIDAPI_KEY,
    API_HOST: process.env.RAPIDAPI_HOST
}
};
