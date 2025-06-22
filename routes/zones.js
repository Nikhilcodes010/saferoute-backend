// routes/zones.js
const express = require("express");
const router = express.Router();
const Zone = require("../models/Zone");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// POST /api/zones/mark — Mark an unsafe zone
router.post("/mark", verifyToken, async (req, res) => {
  try {
    const { lat, lng, description } = req.body;

    const newZone = new Zone({
      lat,
      lng,
      description,
      addedBy: req.user
    });

    await newZone.save();
    res.status(201).json({ msg: "Zone marked successfully", zone: newZone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/zones/all — Get all zones
router.get("/all", async (req, res) => {
  try {
    const zones = await Zone.find().populate("addedBy", "name email");
    res.json(zones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
