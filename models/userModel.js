const mongoose = require("../database/index");

const UserSchema = new mongoose.Schema({
  Nm_User: {
    type: String,
    require: true,
  },
  Ds_Email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  Ds_Login: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  Ds_Password: {
    type: String,
    required: true,
    select: false,
  },
  Dt_Created: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
