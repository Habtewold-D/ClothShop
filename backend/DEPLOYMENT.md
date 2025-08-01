# Backend Deployment Guide

## Environment Variables
Make sure your `.env` file on the production server has these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

## Deployment Steps

1. **Upload the backend files** to your server
2. **Install dependencies**: `npm install`
3. **Set up environment variables** in `.env` file
4. **Start the server**: `npm start` or `node server.js`

## Testing the API

After deployment, test these endpoints:

- `http://api.bernosdesign.com/` - Should return API status
- `http://api.bernosdesign.com/health` - Should return health status
- `http://api.bernosdesign.com/api/clothes` - Should return clothes data

## Common Issues

### CORS Errors
- Make sure the server is running the updated `server.js` with explicit CORS configuration
- Check that your domain is in the allowed origins list

### 404 Errors
- Verify the server is running on the correct port
- Check that all route files are uploaded
- Ensure `node_modules` is installed

### Database Connection
- Verify MongoDB connection string is correct
- Check if the database is accessible from your server

## Server Restart
After making changes, restart your Node.js server:
```bash
# If using PM2
pm2 restart your-app-name

# If using direct node
pkill node
node server.js
``` 