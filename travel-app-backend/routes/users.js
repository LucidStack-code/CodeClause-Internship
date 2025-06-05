
const router = express.Router();
const db = require('../db');

// Get user profile by user id
router.get('/:id', async (req, res) => {
  try {
    const [users] = await db.execute('SELECT id, username, email FROM users WHERE id = ?', [req.params.id]);
    if (users.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// server.js or routes/user.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bhupesh@2004',
  database: 'travel_app'
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).send('Error registering');
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Fetch user by email
app.get('/api/user/:email', (req, res) => {
  const email = req.params.email;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(404).send('User not found');
    res.json(results[0]);
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:3000'));
