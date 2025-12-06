import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get repoId from URL
import axios from "axios";
import Navbar from "../Navbar";

const RepoPage = () => {
  const { repoId } = useParams(); // Get the dynamic repoId from URL
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/${repoId}`);
        setRepoDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch repository: ", err);
      }
    };
    fetchRepo();
  }, [repoId]);

  if (!repoDetails) return <p>Loading repository...</p>;

  return (
    <>
      <Navbar />
      <div className="repo-page-wrapper">
        <h1>{repoDetails.name}</h1>
        <p>{repoDetails.description || "No description"}</p>
        <p>Visibility: {repoDetails.visibility ? "Public" : "Private"}</p>

        <h2>Files / Operations</h2>
        <p>
          Use your terminal to run:
          <br />
          <code>node index.js init</code>, <code>node index.js add &lt;file&gt;</code>, <code>node index.js commit "message"</code>
        </p>

        <h3>Issues</h3>
        {repoDetails.issues && repoDetails.issues.length > 0 ? (
          <ul>
            {repoDetails.issues.map((issue) => (
              <li key={issue._id}>{issue.title}</li>
            ))}
          </ul>
        ) : (
          <p>No issues yet</p>
        )}
      </div>
    </>
  );
};

export default RepoPage;
