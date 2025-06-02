import React from "react";

function RepoList({ repos }) {
  return (
    <div className="repo-list">
      <h3>Repositories:</h3>
      {repos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            <h4>{repo.name}</h4>
          </a>
          <p>{repo.description}</p>
          <small>⭐ {repo.stargazers_count} | 🍴 {repo.forks}</small>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
