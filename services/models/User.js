const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;