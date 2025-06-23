const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://127.0.0.1:8080",
  "http://localhost:8080",
  "https://saferoute-frontend.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Handle preflight (OPTIONS) requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/zones", require("./routes/zones"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
