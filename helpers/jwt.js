const jwt = require('jsonwebtoken')
const { secretKeyJwt } = require("../config/all.config");

require('dotenv').config();

exports.tokenFunction = {
    generateToken(user) {
        try {
            // delete user.password;
            // const token = jwt.sign(user, secretKeyJwt.secretKey);
            return jwt.sign(user, secretKeyJwt.secretKey);
            // return res.status(200).json(token);
        } catch (err) {
            console.log(err)
            // return res.status(500).json('Internal Server Error')
        }
    },
    verifyToken(token) {
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
            return decodeToken;
        } catch (err) {
            // return res.send("Token verification failed");
        }
    }
}

// exports.generateToken = (user, res) => {
//     try {
//         // delete user.password;
//         const token = jwt.sign(user, secretKeyJwt.secretKey);
//         return res.status(200).json(token);
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json('Internal Server Error')
//     }
// }
// exports.verifyToken = (token) => {
//     try {
//         const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
//         return decodeToken;
//     } catch (err) {
//         return res.send("Token verification failed");
//     }
// }