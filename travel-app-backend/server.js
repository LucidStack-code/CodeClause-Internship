const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // ✅ your MySQL username
  password: 'Bhupesh@2004',    // ✅ your MySQL password
  database: 'travel_app'   // ✅ same as DB above
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL DB');
});

// Register Route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Get Profile (by email for demo)
app.get('/profile', (req, res) => {
  const { email } = req.query;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
