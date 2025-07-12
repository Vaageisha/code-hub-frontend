import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRepository.css";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("https://code-hub-backend-production.up.railway.app/repo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          owner: userId, // 👈 changed from `userId` to `owner`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        alert(data.error || "Failed to create repository");
        return;
      }

      alert("Repository created!");
      setName("");
      setDescription("");
      navigate("/");
    } catch (error) {
      console.error("Error creating repo:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="create-repo-container">
      <h2>Create Repository</h2>
      <form className="create-repo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>

      <button
        className="back-button"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default CreateRepository;
