import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyRepositories.css"; // Ensure this is imported

const MyRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`https://code-hub-backend-production.up.railway.app/repo/user/${userId}`);
        const data = await res.json();
        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [userId]);

  return (
    <div className="my-repo-wrapper">
      <div className="navbar">
        <h2>Your Repositories</h2>
        <button className="nav-link" onClick={() => navigate("/")}>Dashboard</button>
      </div>

      <div className="layout">
        <div className="sidebar">
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/create")}>Create Repo</button>
        </div>

        <div className="repo-main">
          {loading ? (
            <p className="loading-text">Loading repositories...</p>
          ) : repositories.length === 0 ? (
            <p className="empty-message">You have no repositories yet.</p>
          ) : (
            repositories.map((repo) => (
              <div className="repo-card" key={repo._id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <div className="action-buttons">
                  <button onClick={() => navigate(`/repo/${repo._id}`)}>View</button>
                  <button onClick={() => navigate(`/repo/${repo._id}/actions`)}>Manage</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRepositories;
