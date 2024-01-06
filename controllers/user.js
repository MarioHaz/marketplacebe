const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateEmail, validateLength } = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email adress already exists",
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be between 3 and 30 characters",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const user = await new User({
      email,
      password: cryptedPassword,
    }).save();

    const token = generateToken({ id: user._id.toString() }, "30d");

    res.send({
      id: user._id,
      email: user.email,
      token: token,

      message: "Register successfull",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email address you entered is not conected to an account",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "The password you entered is incorrect",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "30d");

    res.send({
      id: user._id,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
