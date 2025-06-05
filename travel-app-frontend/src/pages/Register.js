import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', formData);
      alert('Registration successful');
      localStorage.setItem('userEmail', formData.email); // for profile fetch
    } catch (error) {
      alert('Registration failed');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: '30px', textAlign: 'center' },
  form: { maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', fontSize: '16px', backgroundColor: '#2196f3', color: 'white', border: 'none', cursor: 'pointer' }
};
