const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".NovaGit");
  const stagingPath = path.join(repoPath, "staging");

  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);//user gave a file path we read only file name from that path
    await fs.copyFile(filePath, path.join(stagingPath, fileName));//here we copy that file to staging area inside .NovaGit folder
    console.log(`File ${fileName} added to the staging area!`);
  } catch (err) {
    console.error("Error adding file : ", err);
  }
}

module.exports = { addRepo };
