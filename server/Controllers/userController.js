const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }
    user = new userModel({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(201).json({ _id: user._id, name, email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json("Invalid password");
    }
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      let user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

module.exports = {
  registerUser,loginUser,findUser,getUsers
};
