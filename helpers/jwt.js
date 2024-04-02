const jwt = require('jsonwebtoken')
const  {secretKeyJwt}  = require("../config/all.config");

require('dotenv').config();

exports.generateToken = (userId, res)=>{
    try{

        return jwt.sign({userId: userId},secretKeyJwt.secretKey, {expiresIn: '10d'});

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}
exports.verifyToken = (token)=>{
    try{
        return jwt.verify(token, secretKeyJwt.secretKey);
    }catch(err){
       return res.send("Token verification failed");
    }
}