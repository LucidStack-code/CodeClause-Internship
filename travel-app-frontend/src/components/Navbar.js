import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>TravelApp</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/map">Map</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/tips">Tips</Link>
        <Link to="/book">Book</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '15px 30px',
    backgroundColor: '#0077b6',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  link: {
    color: 'white',
    marginLeft: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};
