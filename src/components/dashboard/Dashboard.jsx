import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();  // <-- Added navigate here

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.warn("No userId found in localStorage.");
      return;
    }

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await res.json();
        setRepositories(data.repositories || []);
        setSearchResults(data.repositories || []);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/all`);
        const data = await res.json();
        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, [userId]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setSearchResults(repositories);
      } else {
        try {
          const res = await fetch(`http://localhost:3000/repo/name/${searchQuery}`);
          const data = await res.json();
          setSearchResults(data || []);
        } catch (err) {
          console.error("Error during search:", err);
        }
      }
    }, 300); // debounce: wait 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.length === 0 ? (
            <p>Loading suggestions...</p>
          ) : (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          )}
        </aside>

        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchResults.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            searchResults.map((repo) => (
              <div key={repo._id}>
                <Link to={`/repo/${repo._id}`}>
                  <h4>{repo.name}</h4>
                </Link>
                <p>{repo.description}</p>
              </div>
            ))
          )}

          <div>
            <button onClick={() => navigate("/my-repos")}>
              View Your Repositories
            </button>
          </div>
        </main>

        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
