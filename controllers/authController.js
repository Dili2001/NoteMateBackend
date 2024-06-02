const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as necessary
const generateToken = require("../utils/generateToken"); // Adjust the path as necessary

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
