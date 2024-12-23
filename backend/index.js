const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { checkAuth } = require("./middlewares/auth");
const orderRoutes = require('./routes/order'); 

// ~~~~~~ CONNECT TO DATABASE ~~~~~~
const connectDB = require("./configs/conn.config");
connectDB();

// ~~~~~~ MIDDLEWARES ~~~~~~
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Add this before your routes
app.use(cors({
  // origin: ['http://localhost:5173', 'https://debbhook.vercel.app'],
  origin: "http://localhost:5173",
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  // allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Role'],
  credentials: true,
  preflightContinue: false
}));

// Handle OPTIONS preflight
// app.options('*', cors());

// ~~~~~~ ROUTES ~~~~~~
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/food", checkAuth, foodRoutes);
app.use('/api/orderRoutes', orderRoutes);
// ~~~~~~ SERVER ~~~~~~
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
