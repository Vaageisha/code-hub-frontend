import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repo/CreateRepo"; 
import RepositoryDetails from "./components/repo/RepositoryDetails"; 
import RepositoryActions from "./components/repo/RepositoryActions";
import MyRepositories from "./components/repo/MyRepositories"; // <-- import this new component

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    if (userIdFromStorage && window.location.pathname === "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  const element = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/auth", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile", element: <Profile /> },
    { path: "/create", element: <CreateRepo /> }, 
    { path: "/repo/:id", element: <RepositoryDetails /> },
    { path: "/repo/:id/actions", element: <RepositoryActions /> },
    { path: "/my-repos", element: <MyRepositories /> }, // <-- add this route here
  ]);

  return element;
};

export default ProjectRoutes;
