const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// var gmailEmail = "marketingacad.help@gmail.com";
// var gmailPassword = "abcd9876";
// const mailTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
// });

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // check for referral code if it exists then increment the points of user whose referral code was used

  const {
    referCode,
    firstName,
    lastName,
    email,
    password,
    age,
    codeReferred,
  } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      });
    }

    user = new User({
      referCode,
      firstName,
      lastName,
      email,
      password,
      age,
      codeReferred,
    });

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    if (codeReferred != "") {
      const referCodeUser = await User.findOne({ referCode: codeReferred });
      if (referCodeUser) {
        referCodeUser.points = referCodeUser.points + 2;
        await referCodeUser.save();
      }
    }
    // Return jwt
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, userId: user._id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, userId: user._id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
