# AgriNet

AgriNet is an agricultural eCommerce and networking platform designed to connect farmers/sellers with buyers directly.

---

## Folder Structure

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
└── README.md
```

---

## Setup & Running the Project

### 1. Server (Backend)

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your MongoDB connection details:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`.

---

### 2. Client (Frontend)

1. Open a second terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   Copy `.env.example` to `.env` if custom API URL is needed:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_ADMIN_ACCESS_CODE=admin
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Client will run on `http://localhost:5173`.

---

## Build for Production

To create a production build of the frontend:
```bash
cd client
npm run build
```
Production output will be generated in `client/dist`.
