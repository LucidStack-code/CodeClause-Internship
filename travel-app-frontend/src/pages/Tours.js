import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    api.get('/tours')
      .then(res => setTours(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Tours</h2>
      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            <Link to={`/tours/${tour.id}`}>{tour.title}</Link> — {tour.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tours;
