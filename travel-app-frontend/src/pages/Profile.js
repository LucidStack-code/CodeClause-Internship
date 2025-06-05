import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      axios.get(`http://localhost:3000/profile?email=${email}`)
        .then(res => setUser(res.data))
        .catch(err => console.error('Error loading profile:', err));
    }
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px', textAlign: 'center' },
  card: { maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }
};
