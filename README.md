# AgriNet

AgriNet is an agricultural eCommerce and networking platform designed to connect buyers and farmers/sellers directly.

## Project Structure

The project is organized into two primary applications:

```text
AgriNet/
├── client/          # Frontend application (React + Vite + Tailwind CSS)
│   ├── public/      # Static public assets
│   ├── src/         # React components, pages, context, and styles
│   ├── index.html   # Main HTML entry point
│   ├── package.json # Frontend dependencies and scripts
│   └── vite.config.js
├── server/          # Backend REST API (Node.js + Express + MongoDB)
│   ├── config/      # Database configuration (MongoDB connection)
│   ├── controllers/ # Request controllers (product, user, etc.)
│   ├── middleware/  # Auth and error handling middlewares
│   ├── models/      # Mongoose database models
│   ├── routes/      # Express API route definitions
│   ├── uploads/     # Stored image files for products
│   ├── package.json # Server dependencies and scripts
│   └── server.js    # Express application entry point
├── .gitignore       # Repository ignore rules
├── package.json     # Workspace management and root scripts
└── README.md
```

---

## Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance or MongoDB Atlas account

### 2. Installation

Install dependencies for both client and server:

```bash
# Using root workspace script
npm run install:all

# Or individually
cd client && npm install
cd ../server && npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory based on `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/AgriNet
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

---

## Running the Application

You can run the frontend and backend using root scripts or from their respective directories:

### Run Frontend (Client)
```bash
# From root directory:
npm run dev:client

# Or from client directory:
cd client
npm run dev
```
Client runs at: `http://localhost:5173`

### Run Backend (Server)
```bash
# From root directory:
npm run dev:server

# Or from server directory:
cd server
npm run dev
```
Server runs at: `http://localhost:5000`

---

## Build & Production

To build the client application for production:
```bash
# From root directory:
npm run build:client

# Or from client directory:
cd client
npm run build
```
Production assets are generated in `client/dist`.
