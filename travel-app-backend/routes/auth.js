const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Register user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Check if user exists
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, username: user.username, email: user.email });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
