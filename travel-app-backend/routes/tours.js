const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tours
router.get('/', async (req, res) => {
  try {
    const [tours] = await db.execute('SELECT * FROM tours');
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
