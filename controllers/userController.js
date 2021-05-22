const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
