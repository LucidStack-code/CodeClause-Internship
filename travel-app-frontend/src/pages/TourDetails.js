import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get(`/tours`)
      .then(res => {
        const foundTour = res.data.find(t => t.id === parseInt(id));
        setTour(foundTour);
      });

    api.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!tour) return <div>Loading...</div>;

  return (
    <div>
      <h2>{tour.title}</h2>
      <p>{tour.description}</p>
      <p>Location: {tour.location}</p>

      <MapContainer
        center={[tour.latitude, tour.longitude]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[tour.latitude, tour.longitude]}>
          <Popup>{tour.title}</Popup>
        </Marker>
      </MapContainer>

      <h3>Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      <ul>
        {reviews.map(r => (
          <li key={r.id}>
            Rating: {r.rating} — {r.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TourDetails;
