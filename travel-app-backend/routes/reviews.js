// travel-app-backend/routes/reviews.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM reviews", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { user, content } = req.body;
  db.query(
    "INSERT INTO reviews (user, content) VALUES (?, ?)",
    [user, content],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Review added" });
    }
  );
});

module.exports = router;
