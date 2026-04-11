# Deployment Guide

This project is fully production-ready and configured for deployment on platforms like Heroku, Render, Vercel, or any Node.js hosting.

## Security & Performance Features Added
- **Helmet**: Adds security headers to protect against common web vulnerabilities.
- **Morgan**: Detailed request logging for production monitoring.
- **Compression**: Gzip compression to reduce response sizes and improve speed.
- **Rate Limiting**: Basic DDoS protection (100 requests per 15 mins per IP).
- **Graceful Error Handling**: Global error boundary to prevent server crashes and hide sensitive stack traces in production.

## Steps to Deploy

### 1. Environment Variables
Ensure you set the following environment variables on your hosting platform:
- `MONGO_URI`: Your MongoDB Connection String.
- `JWT_SECRET`: A long, secure random string for signing tokens.
- `NODE_ENV`: Set to `production`.
- `PORT`: (Optional) The platform usually sets this automatically.

### 2. Deployment Logic
The root `package.json` handles everything:
- `npm start`: Runs the backend server.
- `npm run build`: Automatically installs both backend and frontend dependencies and performs the frontend build.
- `Procfile`: Included for platforms like Heroku.

### 3. Local Production Test
To test the production build locally:
1. Run the full build from the root:
   ```bash
   npm run build
   ```
2. Start the server in production mode:
   ```bash
   # On Windows (PowerShell):
   $env:NODE_ENV="production"; npm start
   # On Mac/Linux:
   NODE_ENV=production npm start
   ```
3. Visit `http://localhost:5000`.

## Centralized API URL
The frontend uses `frontend/src/api/config.js` to determine the API URL. In production (served by the backend), it uses relative paths (defaulting to the same domain).

