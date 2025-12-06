const fs = require("fs").promises;//promises are the utility helps to create files and folder asynchronously
const path = require("path");//our current working directory

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".NovaGit");//repo path
  const commitsPath = path.join(repoPath, "commits");//commits path inside repo path

  //proper error handling using try catch
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    );
    console.log("Repository initialised!");
  } catch (err) {
    console.error("Error initialising repository", err);
  }
}

module.exports = { initRepo };
