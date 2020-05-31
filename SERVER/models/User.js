const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  profilePicture: {
    type: String,
  },
  adress: {
    type: String,
  },
  dateofcreation: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = User = mongoose.model("user", UserSchema);
