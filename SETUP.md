# Quick Setup Guide

## Step-by-Step Setup (5 minutes)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Setup PostgreSQL Database

```bash
# Create database
createdb quiz_platform

# Run schema
psql -d quiz_platform -f database/schema.sql
```

### 3. Configure Environment Variables

Create `server/.env` file:

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/quiz_platform
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=development
```

**Replace YOUR_USERNAME and YOUR_PASSWORD with your PostgreSQL credentials**

### 4. Start the Application

Option 1 - Use the combined script:
```bash
npm run dev
```

Option 2 - Start separately:

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

### 5. Access the Application

Open browser: http://localhost:3000

## First Steps

1. Register a new account
2. Create your first quiz
3. Publish it
4. Take the quiz to test it out!

## Common Issues

**Port 5000 already in use:**
```bash
# Kill the process
lsof -ti:5000 | xargs kill
# Or change PORT in server/.env
```

**Database connection error:**
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in DATABASE_URL
- Ensure database exists: `psql -l | grep quiz_platform`

**Module not found:**
```bash
# Reinstall dependencies
cd client && npm install
cd ../server && npm install
```

## Vercel Deployment Quick Start

1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Add environment variables:
   - DATABASE_URL (from managed PostgreSQL service)
   - JWT_SECRET (generate a strong key)
   - NODE_ENV=production
5. Deploy!

## Need Help?

Check the full README.md for detailed instructions and troubleshooting.
