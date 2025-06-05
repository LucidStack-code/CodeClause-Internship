// src/pages/Reviews.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");

  const fetchReviews = async () => {
    const res = await axios.get("http://localhost:5000/api/reviews");
    setReviews(res.data);
  };

  const submitReview = async () => {
    await axios.post("http://localhost:5000/api/reviews", {
      user: "Anonymous",
      content: text,
    });
    setText("");
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Travel Reviews</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
      />
      <br />
      <button onClick={submitReview}>Submit</button>
      <hr />
      {reviews.map((r, i) => (
        <p key={i}>
          <strong>{r.user}:</strong> {r.content}
        </p>
      ))}
    </div>
  );
};

export default Reviews;
