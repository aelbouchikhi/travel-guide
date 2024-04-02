require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORTSERVER || 7500,
  },
  secretKeyJwt: {
    secretKey: process.env.SECRET_KEY,
  },
  cfEmailjs: {
    public_key: process.env.PUBLIC_KEY_EMAILJS,
    service_id: process.env.SERVICE_ID_EMAILJS,
    template_id: process.env.TEMPLATE_ID_EMAILJS,
  },
};
