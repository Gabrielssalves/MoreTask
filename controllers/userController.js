const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await User.find();

    return res.status(200).send({
      message: "Users",
      Users: result,
    });
  }
  catch(error) {
    return res.status(500).send(error);
  }
}

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
          admin: result.Fg_Admin
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).send({
        message: "Successfully authenticated",
        token: token,
        admin: result.Fg_Admin,
        name: result.Nm_User,
        email: result.Ds_Email,
        login: result.Ds_Login
      });
    } else {
      return res.status(401).send({ message: "Authentication failure" });
    }
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .send({ message: "Authentication failure", error: error });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let user = req.body;
    const login = user.login;

    if (!user.login)
      return res.status(400).send({ message: "Enter the login!" });

    if (!user.password)
      return res.status(400).send({ message: "Enter the password!" });

    if (!user.name) return res.status(400).send({ message: "Enter the name!" });

    if (!await User.findOne({ Ds_Login: login })) {
      return res.status(400).send({ error: "User not found!" });
    }
    
    const dataUser = await User.findOne({ Ds_Login: login });

    user.hash = await bcrypt.hash(req.body.password, 10);

    const result = await dataUser.updateOne({
      Nm_User: user.name,
      Ds_Email: user.email,
      Ds_Login: user.login,
      Ds_Password: user.hash,
    }, { new: true });

    result.Ds_Password = undefined;

    return res.status(201).send({
      message: "User successfully updated",
      user: result,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let user = req.user;
    const login = user.login;

    const dataUser = await User.findOne({ Ds_Login: login });

    if (!dataUser) {
      return res.status(400).send({ error: "User not found!" });
    }

    await dataUser.deleteOne();

    return res.status(201).send({
      message: "User successfully deleted",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
