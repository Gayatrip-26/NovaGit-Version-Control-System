const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");//uuidv4 is used to generate unique commit ids.v5 is also there but v4 is more commonly used. v5 is more secure.v5 requiew moe time.

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".NovaGit");
  const stagedPath = path.join(repoPath, "staging");//this for staged files inside .NovaGit folder
  const commitPath = path.join(repoPath, "commits");//here we will store all commits

  try {
    const commitID = uuidv4();//generating unique commit id
    const commitDir = path.join(commitPath, commitID);//commitPath is commits folder inside .NovaGit and commitID is unique id for each commit
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagedPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file)
      );
    }//loop for copying all files from staging area to commit folder
  
    await fs.writeFile( //writeing commit metadata
      path.join(commitDir, "commit.json"),//for each commit we create a commit.json file inside that commit folder
      JSON.stringify({ message, date: new Date().toISOString() })
    );//stringify is used to convert js object to json format

    console.log(`Commit ${commitID} created with message: ${message}`);
  } catch (err) {
    console.error("Error committing files : ", err);
  }
}

module.exports = { commitRepo };
