import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RepositoryDetails.css";

const RepositoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/${id}`);
        const data = await res.json();
        setRepo(data);
        setName(data.name);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };
    fetchRepo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/repo/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const updatedRepo = await response.json();
      setRepo(updatedRepo);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating repository:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this repository?")) return;
    try {
      await fetch(`http://localhost:3000/repo/delete/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (err) {
      console.error("Error deleting repository:", err);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      const res = await fetch(`http://localhost:3000/repo/toggle/${id}`, {
        method: "PATCH",
      });
      const updatedRepo = await res.json();
      setRepo(updatedRepo);
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  if (!repo) return <p>Loading...</p>;

  return (
    <div className="repo-details-container">
      {editMode ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p><strong>Owner:</strong> {repo.owner}</p>
          <p><strong>Visibility:</strong> {repo.visibility ? "Public" : "Private"}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleToggleVisibility}>
            Make {repo.visibility ? "Private" : "Public"}
          </button>
          <button onClick={handleDelete} className="delete">Delete</button>
        </>
      )}
      <button className="back" onClick={() => navigate("/")}>Back to Dashboard</button>
    </div>
  );
};

export default RepositoryDetails;
