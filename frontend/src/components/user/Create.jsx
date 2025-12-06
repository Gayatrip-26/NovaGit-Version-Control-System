

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css";

const Create = () => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:3000/repo/create", {
        name: repoName,
        description,
        visibility: visibility === "public", // boolean
        owner: userId, // assuming controller uses this
      });

      alert("Repository created successfully!");
      navigate("/profile"); // go to profile to see new repo
    } catch (err) {
      console.error(err);
      alert("Failed to create repository");
    }
  };

  return (
    <div className="create-wrapper">
      <h1 className="main-title">Create a new repository</h1>
      <form className="create-box" onSubmit={handleSubmit}>
        <label className="label">Repository name *</label>
        <input
          className="input"
          placeholder="Enter repository name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />

        <label className="label">Description</label>
        <textarea
          className="textarea"
          placeholder="0 / 350 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="label">Choose visibility *</label>
        <select
          className="select"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button className="btn-create">Create repository</button>
      </form>
    </div>
  );
};

export default Create;
