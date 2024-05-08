const { query } = require("express");
const userSchema = require("../schema/user.schema");

exports.adminQuery = {
  async getMgBySomething(model, searchedBy, value) {
    const query = {};
    query[searchedBy] = value;
    return await model.findOne(query);
  },

  async getMgAll(model) {
    return await model.find({});
  },

  async getMgBySomthingAndUpdate(model, searchedBy, value, data) {
    const query = {};
    query[searchedBy] = value;
    return await model.findOneAndUpdate(query, data, {
      new: true,
    });
  },

  async deleteMgBySomthing(model, searchedBy, value) {
    const query = {};
    query[searchedBy] = value;
    return await model.findOneAndDelete(query);
  },
};
