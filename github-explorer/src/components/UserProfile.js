import React from "react";

function UserProfile({ user }) {
  return (
    <div className="profile">
      <img src={user.avatar_url} alt={user.login} />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Followers: {user.followers} • Following: {user.following}</p>
    </div>
  );
}

export default UserProfile;
