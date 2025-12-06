const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },

    // User repositories
    repositories: {
      type: [{ type: Schema.Types.ObjectId, ref: "Repository" }],
      default: [],
    },

    // Users this user follows
    followedUsers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },

    // Starred repositories
    starRepos: {
      type: [{ type: Schema.Types.ObjectId, ref: "Repository" }],
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
