const API_BASE_URL = "https://code-hub-backend-production.up.railway.app/repo"; // Update with your backend base URL

// Helper function for POST requests with JSON body
async function postRequest(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
}

export async function initRepo(repoId) {
  return postRequest(`/init/${repoId}`, {});
}

export async function addRepo(repoId) {
  return postRequest(`/add/${repoId}`, {});
}

export async function commitRepo(repoId, message) {
  return postRequest(`/commit/${repoId}`, { message });
}

export async function pushRepo(repoId) {
  return postRequest(`/push/${repoId}`, {});
}

export async function pullRepo(repoId) {
  return postRequest(`/pull/${repoId}`, {});
}

export async function revertRepo(repoId, commitID) {
  return postRequest(`/revert/${repoId}`, { commitID });
}
