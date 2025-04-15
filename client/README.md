📌 CodeOrbit - AI-Powered Coding Practice Platform

🚀 CodeOrbit is a next-gen online coding practice platform built with MERN  and integrated with AI-powered assistance (Gemini AI). It allows developers to practice coding, collaborate in real-time, analyze strengths and weaknesses, and participate in team-based coding challenges.




🔹 Features

✅ AI-Powered Help - Integrated AI bot (Gemini AI) assists with coding problems.✅ Real-Time Collaboration - Work on coding problems with teams via Socket.io.✅ Two Collaboration Modes -

Edit Mode: Everyone can write and edit code.

Review Mode: Only selected members can edit, others can review.✅ Live Chat System - Team members can discuss solutions using the built-in chat.✅ Personalized Weakness & Strength Analysis - Track your progress and get insights.✅ Coding Rooms - Create rooms for solving problems together.✅ Organize Contests - Host online coding competitions for teams.✅ Secure Authentication - JWT-based authentication for secure logins.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: SQL

Real-Time Collaboration: Socket.io

AI Integration: Gemini AI API

Authentication: JWT (JSON Web Tokens)

🚀 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/kitto30192/codeOrbit
cd CodeOrbit

2️⃣ Install Dependencies

Frontend

cd client
npm install
npm start

Backend

cd server
npm install
npm start

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_ai_api_key
SOCKET_PORT=your_socket_io_port

🖥️ Usage

Create an account & log in.

Join or create a coding room.

Collaborate in real-time with your team.

Use the AI bot for hints and solutions.

Host or participate in coding contests.

🛠️ Contribution Guidelines

We welcome contributions! 🚀

Fork the repository

Create a new branch (git checkout -b feature-branch)

Commit your changes (git commit -m "Add new feature")

Push to your fork (git push origin feature-branch)

Create a pull request
