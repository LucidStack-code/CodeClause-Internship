// src/pages/TravelTips.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TravelTips = () => {
  const [tips, setTips] = useState([]);
  const [text, setText] = useState("");

  const getTips = async () => {
    const res = await axios.get("http://localhost:5000/api/tips");
    setTips(res.data);
  };

  const postTip = async () => {
    await axios.post("http://localhost:5000/api/tips", {
      user: "Anonymous",
      content: text,
    });
    setText("");
    getTips();
  };

  useEffect(() => {
    getTips();
  }, []);

  return (
    <div>
      <h2>Travel Tips</h2>
      <textarea
        placeholder="Share your tip..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <button onClick={postTip}>Submit</button>
      <hr />
      {tips.map((tip, i) => (
        <p key={i}>
          <strong>{tip.user}:</strong> {tip.content}
        </p>
      ))}
    </div>
  );
};

export default TravelTips;
