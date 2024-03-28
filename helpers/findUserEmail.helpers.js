const mongosse = require('mongoose');
const userSchema = require('../models/schema/user.schema')


exports.findUseremail = async(email)=> {
    return await userSchema.findOne({email});
}