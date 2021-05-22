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
  Ob_SpotifyAuth: {
    Cd_AccessToken: { type: String, required: false },
    Cd_RefreshToken: { type: String, required: false },
  },
  Ob_Tracks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    require: true,
  }],
  Ob_Artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    require: true,
  }],
  Ob_Genres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    require: true,
  }],
  Dt_Created: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
