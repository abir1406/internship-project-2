# BlogApp 📝

A full-stack blog platform where you can register, log in, and write, edit, or delete your own posts. Built this as part of the Full-Stack Web Development internship at Main Flow Services and Technologies.

## What's inside

- **Frontend:** React (Vite) + React Router + Axios
- **Backend:** Node.js + Express + MongoDB (Mongoose) + JWT auth

## Getting it running on your machine

### 1. Clone the repo

```bash
git clone <your-repo-link>
cd blog-app
```

### 2. Set up the backend 

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with the following:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_random_string
JWT_EXPIRES_IN=7d
```

Get your `MONGODB_URI` from MongoDB Atlas → Connect → Drivers (Node.js), and don't forget to swap in your actual username/password and add your database name before the `?`.

Start the server:

```bash
node server.js
```

You should see `Connected to MongoDB` and `Server on http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

This opens the app at `http://localhost:5173` (or 5174 if 5173 is already taken).

### 4. Use the app

- Register a new account
- Create, edit, or delete your own posts
- Browse posts from the homepage without logging in

## Notes

- Keep both the backend and frontend running at the same time in separate terminals — the frontend talks to the backend over `localhost:5000`.
- Never commit your `.env` file — it's already in `.gitignore`.
