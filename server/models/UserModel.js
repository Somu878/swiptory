const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required field"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
  },
});

module.exports = mongoose.model("User", userSchema, "userData");
