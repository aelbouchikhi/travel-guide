const mongosse = require('mongoose');
const userSchema = require('../schema/user.schema')


exports.findUserByEmail = async (email) => {
    return await userSchema.findOne({ email });
}

exports.findAndUpdate = async (searchBy, toUpdate) => {
    return await userSchema.findOneAndUpdate(searchBy, toUpdate, { new: true });
}
