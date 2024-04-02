const jwt = require('jsonwebtoken')
const { secretKeyJwt } = require("../config/all.config");

require('dotenv').config();

exports.tokenFunction = {
    generateToken(user) {
        return jwt.sign(user, secretKeyJwt.secretKey);
    },
    verifyToken(token) {
        return jwt.verify(token, secretKeyJwt.secretKey);
    }
}
