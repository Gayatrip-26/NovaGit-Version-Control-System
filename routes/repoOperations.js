// routes/repoOperations.js
const express = require("express");
const router = express.Router();
const { initRepo } = require("../controllers/init"); // your init.jsx

// POST /repo/:repoId/init
router.post("/repo/:repoId/init", async (req, res) => {
  try {
    await initRepo();
    res.json({ message: "Repository initialized successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to initialize repository" });
  }
});

module.exports = router;
