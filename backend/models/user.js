const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
    min: [1000000000, 'Phone number should be 10 digits'],
    max: [9999999999, 'Phone number should be 10 digits']
  },
  role: {
    type: String,
    enum: ["CUSTOMER", "ADMIN", "SUPER_ADMIN"],
    default: "CUSTOMER",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;