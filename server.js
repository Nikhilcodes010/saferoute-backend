// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(cors());                // Allows cross-origin requests
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