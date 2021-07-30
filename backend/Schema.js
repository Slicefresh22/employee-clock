const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  gender: String,
  age: Number,
});

const userModel = mongoose.model("Users", userSchema);

module.exports = {
  userModel: userModel,
};
