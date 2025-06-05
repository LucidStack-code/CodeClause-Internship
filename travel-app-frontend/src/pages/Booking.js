import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Booking() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token"); // assuming token stored here

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tours/${tourId}`)
      .then(res => {
        setTour(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching tour:", err));
  }, [tourId]);

  const handleBooking = () => {
    axios.post("http://localhost:5000/api/bookings", {
      tourId,
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(() => {
        alert("Booking successful!");
        navigate("/profile");
      })
      .catch(err => {
        console.error("Booking failed:", err);
        alert("Failed to book tour");
      });
  };

  if (loading) return <p>Loading tour info...</p>;
  if (!tour) return <p>Tour not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Book Tour: {tour.name}</h2>
      <p><strong>Price:</strong> ${tour.price}</p>
      <p><strong>Description:</strong> {tour.description}</p>

      <button onClick={handleBooking} style={{ padding: "10px 20px", marginTop: "1rem" }}>
        Confirm Booking
      </button>
    </div>
  );
}

export default Booking;
