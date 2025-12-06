# 🚀 NovaGit – GitHub Clone (Version Control System)

A full-stack **GitHub clone** built with **Node.js, Express, MongoDB, React**, and **AWS**, featuring console-based Git commands, backend APIs, and a frontend UI for repository management.

![Tech](https://img.shields.io/badge/Tech-MERN%20%7C%20Node%20%7C%20Express%20%7C%20MongoDB%20%7C%20AWS-blue)
![Status](https://img.shields.io/badge/Project_Status-Completed-green)

---

## 📌 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Backend Setup](#backend-setup)
* [Frontend Setup](#frontend-setup)
* [Environment Variables](#environment-variables)
* [Console Commands](#console-commands)
* [API Overview](#api-overview)
* [Screenshots](#screenshots)
* [Author](#author)

---

## 🚀 Overview

**NovaGit** replicates core features of Git and GitHub, allowing users to:

✔️ Initialize repositories
✔️ Track and stage files
✔️ Commit changes with messages
✔️ Push and pull from AWS cloud storage
✔️ Revert commits
✔️ Manage repositories, issues, and users via backend APIs
✔️ Access functionalities through a React frontend

This project has **three major components**:

1. **Console Commands** – Node.js CLI to replicate Git commands.
2. **Backend** – Express + MongoDB API for user, repository, and issue management.
3. **Frontend** – React UI to visualize repositories, issues, and dashboard.

---

## 🔑 Features

### 🖥 Console Commands (CLI)

* `node index.js init` – Initialize a new repository (`.s3git` folder created).
* `node index.js add <file>` – Add a file to the staging area.
* `node index.js commit "<message>"` – Commit staged files with a unique ID.
* `node index.js push` – Push commits to AWS S3 bucket.
* `node index.js pull` – Pull commits from AWS S3.
* `node index.js revert <commit-id>` – Revert to a previous commit.

### 🔐 Authentication

* User signup & login with **JWT**
* Secure password storage using **bcrypt**
* API-based authentication for all CRUD operations

### 🗂️ Repository Management

* Create repositories with name, description, visibility, owner
* Track content and commits
* Issue management: title, description, status linked to repositories

### 🖌 Frontend Features

* User authentication (login/signup)
* Dashboard for repositories
* Repository and issue management UI

---

## 🛠️ Tech Stack

### **Frontend**

* React.js
* HTML, CSS, JavaScript
* Bootstrap

### **Backend**

* Node.js, Express.js
* Yargs (for console command parsing)
* AWS SDK (S3 integration)
* JWT, bcrypt (Authentication)
* MongoDB (Database)

### **Other Tools**

* VS Code, Google Chrome (for testing)
* Git (tracking files & version control)
* Jest (React testing)

---

## 📁 Project Structure

```
NovaGit/
│
├── backend/
│   ├── models/          # User, Repository, Issue models
│   ├── routes/          # API endpoints
│   ├── .env
│   ├── index.js         # CLI commands and server
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
```

---

## ⚙️ Backend Setup

1️⃣ Go to backend folder:

```bash
cd backend
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start backend server:

```bash
node index.js start
```

Server runs by default on:

```
http://localhost:5000
```

---

## ▶️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file inside **backend/**:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your-region
```

---

## 💻 Console Commands

| Command                            | Description               |
| ---------------------------------- | ------------------------- |
| `node index.js start`              | Starts backend server     |
| `node index.js init`               | Initialize new repository |
| `node index.js add <file>`         | Add file to staging area  |
| `node index.js commit "<message>"` | Commit staged files       |
| `node index.js push`               | Push commits to AWS S3    |
| `node index.js pull`               | Pull commits from AWS S3  |
| `node index.js revert <commit-id>` | Revert to previous commit |

---

## 📡 API Overview

### **User Routes**

* `POST /signup` – Register a new user
* `POST /login` – Authenticate and return JWT token
* `GET /allUsers` – Fetch all users
* `GET /userProfile/:id` – Get user details
* `DELETE /deleteProfile/:id` – Delete user

### **Repository Routes**

* CRUD operations for repositories

### **Issue Routes**

* CRUD operations for issues

All operations interact with MongoDB database.

---

![Signup (Localhost)](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.52.13_9fd53d21.jpg)
<p align="center"><em>Localhost signup page for NovaGit user registration.</em></p>

![GitHub-like Profile UI](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.51.30_55797a37.jpg)
<p align="center"><em>Main NovaGit dashboard showing username, create repo option, profile menu, and heatmap.</em></p>

![Repository Creation Page](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.53.13_d60e3c3f.jpg)
<p align="center"><em>Create repository page on localhost with repo name, description, and README toggle.</em></p>

![Signup API Endpoint](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.50.13_ee652a8d.jpg)
<p align="center"><em>Signup API endpoint tested via Postman showing token response.</em></p>

![Login API Endpoint](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.51.30_55797a37.jpg)
<p align="center"><em>Login API endpoint returning authentication token.</em></p>

![All USER](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.51.51_e1840463.jpg)
<p align="center"><em>API endpoint showing list of all logged-in user.</em></p>

![Create Repository API](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2015.52.53_9c5b9362.jpg)
<p align="center"><em>API endpoint to create a new repository via POST request.</em></p>

![AWS S3 Commit Storage](https://github.com/Gayatrip-26/NovaGit-Version-Control-System/blob/dd8ff6a976c6ca712dd39a04a1e67484a0b046ab/WhatsApp%20Image%202025-12-06%20at%2016.42.05_8359d4f8.jpg)
<p align="center"><em>Commits saved into AWS S3 bucket (JSON + TXT files).</em></p>

---

## 👩‍💻 Author

**Gayatri Patil**
📧 Email: [gayatripp26@gmail.com](mailto:gayatripp26@gmail.com)

🐙 GitHub: [https://github.com/Gayatrip-26](https://github.com/Gayatrip-26)

💼 LinkedIn: https://www.linkedin.com/in/gayatri-patil-26

