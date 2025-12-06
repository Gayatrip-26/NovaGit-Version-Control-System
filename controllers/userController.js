// //fuctionaility for user signup, login, profile management using MongoDB
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { MongoClient } = require("mongodb");
// const dotenv = require("dotenv");
// var ObjectId = require("mongodb").ObjectId;

// dotenv.config();
// const uri = process.env.MONGODB_URI;

// let client;

// async function connectClient() {
//   if (!client) {
//     client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//   }
// }

// async function signup(req, res) {
//   const { username, password, email } = req.body;
//   try {
//     await connectClient();
//     const db = client.db("NovaGit");
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ username });
//     if (user) {
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = {
//       username,
//       password: hashedPassword,
//       email,
//       repositories: [],
//       followedUsers: [],
//       starRepos: [],
//     };

//     const result = await usersCollection.insertOne(newUser);

//     const token = jwt.sign(
//       { id: result.insertId },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1h" }
//     );
//     res.json({ token, userId: result.insertId });
//   } catch (err) {
//     console.error("Error during signup : ", err.message);
//     res.status(500).send("Server error");
//   }
// }

// async function login(req, res) {
//   const { email, password } = req.body;
//   try {
//     await connectClient();
//     const db = client.db("NovaGit");
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1h",
//     });
//     res.json({ token, userId: user._id });
//   } catch (err) {
//     console.error("Error during login : ", err.message);
//     res.status(500).send("Server error!");
//   }
// }
// //fetch all users from database when search for users
// async function getAllUsers(req, res) {
//   try {
//     await connectClient();
//     const db = client.db("NovaGit");
//     const usersCollection = db.collection("users");

//     const users = await usersCollection.find({}).toArray();
//     res.json(users);
//   } catch (err) {
//     console.error("Error during fetching : ", err.message);
//     res.status(500).send("Server error!");
//   }
// }

// async function getUserProfile(req, res) {
//   const currentID = req.params.id;

//   try {
//     await connectClient();
//     const db = client.db("NovaGit");
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({
//       _id: new ObjectId(currentID),
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     res.send(user);
//   } catch (err) {
//     console.error("Error during fetching : ", err.message);
//     res.status(500).send("Server error!");
//   }
// }

// async function updateUserProfile(req, res) {
//   const currentID = req.params.id;
//   const { email, password } = req.body;

//   try {
//     await connectClient();
//     const db = client.db("NovaGit");
//     const usersCollection = db.collection("users");

//     let updateFields = {};

//     if (email) updateFields.email = email;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       updateFields.password = await bcrypt.hash(password, salt);
//     }

//     const result = await usersCollection.findOneAndUpdate(
//       { _id: new ObjectId(currentID) },
//       { $set: updateFields },
//       { returnDocument: "after" }
//     );

//     if (!result.value) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     res.send(result.value);
//   } catch (err) {
//     console.error("Error during updating:", err);
//     res.status(500).send("Server error!");
//   }
// }


// async function deleteUserProfile(req, res) {
//   const currentID = req.params.id;

//   try {
//     await connectClient();
//     const db = client.db("NovaGit");
//     const usersCollection = db.collection("users");

//     const result = await usersCollection.deleteOne({
//       _id: new ObjectId(currentID),
//     });

//     if (result.deleteCount == 0) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     res.json({ message: "User Profile Deleted!" });
//   } catch (err) {
//     console.error("Error during updating : ", err.message);
//     res.status(500).send("Server error!");
//   }
// }
// //exporting all functions . we cant do export default because nodejs use commonjs
// module.exports = {
//   getAllUsers,
//   signup,
//   login,
//   getUserProfile,
//   updateUserProfile,
//   deleteUserProfile,
// };
// Functionality for user signup, login, profile management using MongoDB

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

// --------------------------------------
// CONNECT MONGO CLIENT
// --------------------------------------
async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

// --------------------------------------
// SIGNUP
// --------------------------------------
async function signup(req, res) {
  const { username, password, email } = req.body;

  try {
    await connectClient();
    const db = client.db("NovaGit");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: result.insertedId });

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Server error");
  }
}

// --------------------------------------
// LOGIN
// --------------------------------------
async function login(req, res) {
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("NovaGit");
    const usersCollection = db.collection("users");

    // const user = await usersCollection.findOne({ email });
    const user = await usersCollection.findOne({
      $or: [{ email }, { username: email }]
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Server error!");
  }
}

// --------------------------------------
// GET ALL USERS
// --------------------------------------
async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("NovaGit");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);

  } catch (err) {
    console.error("Error during fetching:", err);
    res.status(500).send("Server error!");
  }
}

// --------------------------------------
// GET USER PROFILE BY ID
// --------------------------------------
async function getUserProfile(req, res) {
  const currentID = req.params.id;

  if (!ObjectId.isValid(currentID)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    await connectClient();
    const db = client.db("NovaGit");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(currentID) });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(user);

  } catch (err) {
    console.error("Error during fetching:", err);
    res.status(500).send("Server error!");
  }
}

// --------------------------------------
// UPDATE USER PROFILE
// --------------------------------------
async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  if (!ObjectId.isValid(currentID)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    await connectClient();
    const db = client.db("NovaGit");
    const usersCollection = db.collection("users");

    let updateFields = {};

    if (email) updateFields.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentID) },
      { $set: updateFields },
      { returnOriginal: false }   // <-- FIXED HERE
    );

    if (!result || !result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(result.value);

  } catch (err) {
    console.error("Error during updating:", err);
    res.status(500).send("Server error!");
  }
}


// --------------------------------------
// DELETE USER PROFILE
// --------------------------------------
async function deleteUserProfile(req, res) {
  const currentID = req.params.id;

  if (!ObjectId.isValid(currentID)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    await connectClient();
    const db = client.db("NovaGit");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User Profile Deleted!" });

  } catch (err) {
    console.error("Error during deleting:", err);
    res.status(500).send("Server error!");
  }
}

// --------------------------------------
// EXPORT ALL FUNCTIONS
// --------------------------------------
module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
