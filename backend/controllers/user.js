const User = require("../models/user");
const { generateToken } = require("../configs/auth.config");
const { hashPassword, comparePassword } = require("../configs/hash.config");
  
exports.signup = async (req, res) => {
  const { name, email, password, address, phone, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email already exists" 
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone : Number(phone),
      role,
    });
    console.log("user created successfully", user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      console.log("invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(user);
    const expiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res
      .status(200)
      .cookie("token", token, { expires: expiresIn })
      .send({ user, token, message: "Logged in successfully" }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
