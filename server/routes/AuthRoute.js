const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const Joi = require("joi");
const userValidation = Joi.object({
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
});
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = await userValidation.validateAsync(req.body);
    const userExists = await User.findOne({
      username: username,
    });
    if (!userExists) {
      return res.status(404).json({ message: "No account exists" });
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userID: userExists._id }, process.env.JWT_SECRET);
    res.json({
      message: "Login Suceessful",
      token: token,
    });
  } catch (error) {
    if (error.details) {
      return res.status(400).send(error.details);
    }
    return res.status(500).send("Internal Server Error");
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = await userValidation.validateAsync(req.body);
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(400).json({
        message:
          "Username already exists. Please login or try a different username.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = await jwt.sign(
      { userID: savedUser._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      message: "Registered successfully!",
      token: token,
    });
  } catch (error) {
    if (error.details) {
      return res.status(400).send(error.details);
    } else {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = authRouter;
