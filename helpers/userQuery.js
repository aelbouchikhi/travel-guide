const User = require('../models/schema/user.schema');
const { compareHashedPassword } = require('./hashPassword');

class userQuery{
    findUser = (email) => {
        return User.findOne({email: email});
    }
    
    matchedPassword = async (password, userPassword) =>{
      return await compareHashedPassword(password, userPassword)
    }  
}

module.exports = new userQuery;