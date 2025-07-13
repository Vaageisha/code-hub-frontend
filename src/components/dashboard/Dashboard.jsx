import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    const fetchRepositories = async () => {
      const res = await fetch(`https://code-hub-backend-production.up.railway.app/repo/user/${userId}`);
      const data = await res.json();
      setRepositories(data.repositories || []);
      setSearchResults(data.repositories || []);
    };
    const fetchSuggestedRepositories = async () => {
      const res = await fetch(`https://code-hub-backend-production.up.railway.app/repo/all`);
      const data = await res.json();
      setSuggestedRepositories(data || []);
    };
    fetchRepositories();
    fetchSuggestedRepositories();
  }, [userId]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setSearchResults(repositories);
      } else {
        const res = await fetch(`https://code-hub-backend-production.up.railway.app/repo/name/${searchQuery}`);
        const data = await res.json();
        setSearchResults(data || []);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        <section id="dashboard">
          {/* Left Panel */}
          <aside className="panel">
            <h3>Suggested Repositories</h3>
            {suggestedRepositories.length === 0 ? (
              <p>Loading suggestions...</p>
            ) : (
              suggestedRepositories.map((repo) => (
                <div key={repo._id} className="card">
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                </div>
              ))
            )}
          </aside>

          {/* Main Panel */}
          <main className="panel">
            <h2>Your Repositories</h2>
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length === 0 ? (
              <p>No repositories found.</p>
            ) : (
              searchResults.map((repo) => (
                <div key={repo._id} className="card">
                  <Link to={`/repo/${repo._id}`}>
                    <h4>{repo.name}</h4>
                  </Link>
                  <p>{repo.description}</p>
                </div>
              ))
            )}
            <button className="view-button" onClick={() => navigate("/my-repos")}>
              View All Repositories
            </button>
          </main>

          {/* Right Panel */}
          <aside className="panel">
            <h3>Upcoming Events</h3>
            <ul className="events">
              <li>Tech Conference - Dec 15</li>
              <li>Developer Meetup - Dec 25</li>
              <li>React Summit - Jan 5</li>
            </ul>
          </aside>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
