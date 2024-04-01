const mongosse = require('mongoose');
const userSchema = require('../models/schema/user.schema')


exports.findUseremail = async (email) => {
    return await userSchema.findOne({ email });
}

exports.findAndUpdate = async (searchBy, toUpdate) => {
    return await userSchema.findOneAndUpdate(searchBy, toUpdate, { new: true });
}
    