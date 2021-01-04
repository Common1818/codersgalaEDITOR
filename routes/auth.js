const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  signup,
  signin,
  sendResetEmail,
  resetPassword,
} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("age", "Age is required").notEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({
      min: 1,
    }),
  ],
  signin
);

module.exports = router;
