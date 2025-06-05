const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

// POST /api/bookings
router.post("/", verifyToken, (req, res) => {
  const { tourId } = req.body;
  const userId = req.user.id;

  const query = "INSERT INTO bookings (user_id, tour_id, booking_date) VALUES (?, ?, NOW())";
  db.query(query, [userId, tourId], (err, result) => {
    if (err) {
      console.error("Booking insert error:", err);
      return res.status(500).json({ message: "Booking failed" });
    }
    res.status(201).json({ message: "Booking successful" });
  });
});

module.exports = router;
