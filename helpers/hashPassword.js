const bcrypt = require('bcrypt')

class Hashing{
    hashPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    }
    compareHashedPassword = async (password, userPassword) =>{
        return await bcrypt.compare(password, userPassword);
    }
}

module.exports = new Hashing;