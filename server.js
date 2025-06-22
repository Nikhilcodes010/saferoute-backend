// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize the Express app
const app = express();

// Middlewares
// Allow frontend origin (adjust if you use localhost or 127.0.0.1)
app.use(cors({
  origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
  credentials: true
}));

app.use(express.json());       // Parses incoming JSON requests

// Routes
app.use("/api/auth", require("./routes/auth"));  // To be created
app.use("/api/zones", require("./routes/zones")); // To be created

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
})
.catch(err => console.error("DB connection error:", err));