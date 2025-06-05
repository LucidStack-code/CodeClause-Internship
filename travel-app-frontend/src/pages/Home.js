import React from 'react';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to TravelApp!</h1>
      <p>Discover destinations. Plan trips. Book tours. Make memories.</p>
      <img
        src="https://source.unsplash.com/800x400/?travel,beach"
        alt="Travel Banner"
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    marginTop: '20px',
    borderRadius: '10px',
  }
};
