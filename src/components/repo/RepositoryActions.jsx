import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./RepositoryActions.css";

const RepositoryActions = () => {
  const { id } = useParams(); // repoId from URL
  const [commitMessage, setCommitMessage] = useState("");
  const [commitID, setCommitID] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const callRepoAction = async (action, data = {}) => {
    try {
      const res = await fetch(`http://localhost:3000/repo/${action}/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: Object.keys(data).length ? JSON.stringify(data) : null,
      });

      const result = await res.json();
      setResponseMsg(result.message || "Action completed!");
    } catch (err) {
      console.error(`Failed to ${action}:`, err);
      setResponseMsg(`Failed to ${action}`);
    }
  };

  return (
    <div>
      <h2>Repository Actions</h2>

      <button onClick={() => callRepoAction("init")}>Initialize Repo</button>
      <button onClick={() => callRepoAction("add")}>Add Files</button>

      <div>
        <input
          type="text"
          placeholder="Commit message"
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
        />
        <button
          onClick={() => {
            if (!commitMessage) {
              setResponseMsg("Please enter a commit message.");
              return;
            }
            callRepoAction("commit", { message: commitMessage });
          }}
        >
          Commit
        </button>
      </div>

      <button onClick={() => callRepoAction("push")}>Push</button>
      <button onClick={() => callRepoAction("pull")}>Pull</button>

      <div>
        <input
          type="text"
          placeholder="Commit ID to revert"
          value={commitID}
          onChange={(e) => setCommitID(e.target.value)}
        />
        <button
          onClick={() => {
            if (!commitID) {
              setResponseMsg("Please enter a commit ID.");
              return;
            }
            callRepoAction("revert", { commitID });
          }}
        >
          Revert
        </button>
      </div>

      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
};

export default RepositoryActions;
