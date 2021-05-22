const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const User = require("../models/userModel");

require("dotenv").config();

const { CLIENT_ID, CLIENT_SECRET, SPOTIFY_SCOPE } = process.env;
const { getAccessToken, getRefreshToken } =
  require("../services/spotifyService")(CLIENT_ID, CLIENT_SECRET);

var redirect_uri = "http://localhost:3000/user/spotify/callback";
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";
var userKey = "Id_User";

exports.createUser = async (req, res, next) => {
  try {
    let user = req.body;
    const login = user.login;
    if (!user.login)
      return res.status(400).send({ message: "Enter the login!" });

    if (!user.password)
      return res.status(400).send({ message: "Enter the password!" });

    if (!user.name) return res.status(400).send({ message: "Enter the name!" });

    if (await User.findOne({ Ds_Login: login })) {
      return res.status(400).send({ error: "User already exists!" });
    }

    user.hash = await bcrypt.hash(req.body.password, 10);

    const result = await User.create({
      Nm_User: user.name,
      Ds_Email: user.email,
      Ds_Login: user.login,
      Ds_Password: user.hash,
    });

    result.Ds_Password = undefined;

    return res.status(201).send({
      message: "User successfully registered",
      user: result,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.loginUser = async (req, res, next) => {
  let user = req.body;
  try {
    const result = await User.findOne({ Ds_Login: user.login }).select(
      "+Ds_Password"
    );

    if (!result) {
      return res.status(401).send({ message: "Authentication failure" });
    }
    const match = await bcrypt.compare(user.password, result.Ds_Password);

    if (match) {
      const token = jwt.sign(
        {
          idUser: result._id,
          email: result.Ds_Email,
          name: result.Nm_User,
          login: result.Ds_Login,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).send({
        message: "Successfully authenticated",
        token: token,
      });
    } else {
      return res.status(401).send({ message: "Authentication failure" });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Authentication failure", error: error });
  }
};

exports.loginSpotify = (req, res) => {
  var state = generateRandomString(16);
  var idUser = req.query.idUser || null;

  if (idUser === null) {
    return res.status(400).send({ message: "User not found" });
  }

  res.cookie(stateKey, state);
  res.cookie(userKey, idUser);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SPOTIFY_SCOPE,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true,
      })
  );
};

exports.loginSpotifyCallback = async (req, res) => {
  var idUser = req.cookies ? req.cookies[userKey] : null;

  if (idUser === null) {
    return res.status(400).send({ message: "User not found" });
  }

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    return res.status(500).send({ message: "Authentication failed" });
  } else {
    res.clearCookie(stateKey);

    try {
      const auth = await getAccessToken({ code, redirect_uri });

      await User.findByIdAndUpdate(
        idUser,
        {
          Ob_SpotifyAuth: {
            Cd_AccessToken: auth.access_token,
            Cd_RefreshToken: auth.refresh_token,
          },
        },
        { new: true }
      );

      const response = {
        message: "Permission garanted",
      };

      return res.status(200).send({ response });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }
};

exports.loginSpotifyRefresh = async (req, res) => {
  const result = await User.findById(req.user.idUser);

  try {
    const auth = await getRefreshToken(result.Ob_SpotifyAuth.Cd_RefreshToken);

    await result.updateOne(
      {
        Ob_SpotifyAuth: {
          Cd_RefreshToken: result.Ob_SpotifyAuth.Cd_RefreshToken,
          Cd_AccessToken: auth.access_token,
        },
      },
      { new: true }
    );

    const response = {
      message: "Permission garanted",
    };
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
