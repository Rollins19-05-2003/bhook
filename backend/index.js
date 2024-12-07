const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { checkAuth } = require("./middlewares/auth");

// ~~~~~~ CONNECT TO DATABASE ~~~~~~
const connectDB = require("./configs/conn.config");
connectDB();

// ~~~~~~ MIDDLEWARES ~~~~~~
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// ~~~~~~ ROUTES ~~~~~~
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/food", checkAuth, foodRoutes);

// ~~~~~~ SERVER ~~~~~~
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
