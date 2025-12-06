
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username", repositories: [] });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          // Fetch user info
          const userResponse = await axios.get(`http://localhost:3000/userProfile/${userId}`);
          const userData = userResponse.data;

          // Fetch all repositories
          const repoResponse = await axios.get(`http://localhost:3000/repo/all`);
          const userRepos = repoResponse.data;

          setUserDetails({ ...userData, repositories: userRepos });
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  // Navigate to repository page
  const handleRepoClick = (repoId) => {
    navigate(`/repo/${repoId}`); // your repo page route
  };

  return (
    <>
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": { textDecoration: "underline", color: "white" },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": { textDecoration: "underline", color: "white" },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);
          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="profile-image"></div>
          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>
          <button className="follow-btn">Follow</button>
          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="heat-map-section">
          <HeatMapProfile />
        </div>

        {/* Repositories Section */}
        <div className="repositories-section">
          <h2>Your Repositories</h2>
          {userDetails.repositories && userDetails.repositories.length > 0 ? (
            <div className="repo-list">
              {userDetails.repositories.map((repo) => (
                <div
                  key={repo._id}
                  className="repo-card"
                  onClick={() => handleRepoClick(repo._id)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 className="repo-name">{repo.name}</h3>
                  <p className="repo-description">{repo.description || "No description"}</p>
                  <span className="repo-visibility">{repo.visibility ? "Public" : "Private"}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No repositories yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
