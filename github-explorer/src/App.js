import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);

  const fetchRepos = async (username) => {
    try {
      const [userRes, repoRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos`)
      ]);
      setUser(userRes.data);
      setRepos(repoRes.data);
    } catch (error) {
      alert("User not found");
      setUser(null);
      setRepos([]);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Explorer</h1>
      <SearchBar onSearch={fetchRepos} />
      {user && <UserProfile user={user} />}
      <RepoList repos={repos} />
    </div>
  );
}

export default App;
