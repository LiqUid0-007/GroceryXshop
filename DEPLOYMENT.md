# Deployment Guide

This project is now configured for easy deployment on platforms like Heroku, Render, Vercel, or any Node.js hosting.

## Steps to Deploy

### 1. Environment Variables
Ensure you set the following environment variables on your hosting platform:
- `MONGO_URI`: Your MongoDB Connection String.
- `JWT_SECRET`: A long, secure random string for signing tokens.
- `NODE_ENV`: Set to `production`.
- `PORT`: (Optional) The platform usually sets this automatically.

### 2. Deployment Logic
The project structure is designed so that:
- The backend serves the built frontend files from `frontend/dist`.
- The `package.json` in the root handles the build process automatically on most platforms (via `heroku-postbuild` or custom build commands).

### 3. Local Production Test
To test the production build locally:
1. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Start the backend in production mode:
   ```bash
   cd ../backend
   # On Windows (PowerShell):
   $env:NODE_ENV="production"; node server.js
   # On Mac/Linux:
   NODE_ENV=production node server.js
   ```
3. Visit `http://localhost:5000` (or your set PORT).

## Centralized API URL
The frontend uses `frontend/src/api/config.js` to determine the API URL. In production (when served by the backend), it uses relative paths (defaulting to the same domain).
