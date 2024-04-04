const { tokenFunction } = require("./jwt")

module.exports = {
    async createLinkToVerify(username, email) {
        const tokenForVerification = await tokenFunction.generateToken({ username, email });
        // console.log(tokenForVerification);
        return (`http://localhost:3000/api/users/verify/${tokenForVerification}`);
    }
}