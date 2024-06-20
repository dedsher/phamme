const express = require("express");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
