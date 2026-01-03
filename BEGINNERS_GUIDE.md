# 🎓 BEGINNER'S GUIDE - First Time Running Node.js Project

## 📋 What You Have Now

Your Quiz Platform is **fully built** and ready to run! You just need to complete 3 simple steps.

---

## 🚀 3 SIMPLE STEPS TO START

### Step 1: Setup PostgreSQL Database (ONE TIME ONLY)

**Option A: Using pgAdmin (Recommended - Easy)**

1. Press **Windows Key** on keyboard
2. Type: **pgAdmin**
3. Click on **pgAdmin 4** to open it
4. Enter your master password (the one you set during PostgreSQL installation)

**Create the Database:**
- In the left sidebar, find **"Databases"**
- Right-click on **"Databases"**
- Click **"Create"** → **"Database..."**
- In "Database" field, type: **quiz_platform**
- Click **"Save"** button

**Load the Schema (Create Tables):**
- In the left sidebar, right-click on **"quiz_platform"** database
- Click **"Query Tool"**
- In the Query Tool, click the **folder icon** (📁 "Open File")
- Navigate to your project folder:
  ```
  C:\Users\mr\OneDrive\Documents\Projects\Quiz_platform\database
  ```
- Select the file: **schema.sql**
- Click the **▶ Execute/Run button** (or press F5)
- You should see: **"Query returned successfully"**

**Done!** ✅ Your database is ready!

---

**Option B: Using SQL Shell (Command Line)**

1. Press **Windows Key**
2. Type: **SQL Shell** or **psql**
3. Open **SQL Shell (psql)**
4. Press **Enter** 4 times (to use defaults for Server, Database, Port, Username)
5. Enter your PostgreSQL password
6. Type these commands one by one:

```sql
CREATE DATABASE quiz_platform;
\c quiz_platform
\i 'C:/Users/mr/OneDrive/Documents/Projects/Quiz_platform/database/schema.sql'
\q
```

---

### Step 2: Update Database Password

1. Open the file: **server\.env**
2. Find line 2 that says:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/quiz_platform
   ```
3. Replace the SECOND `postgres` with YOUR actual PostgreSQL password:
   ```
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/quiz_platform
   ```
4. Save the file

---

### Step 3: Test & Start

**Test the database connection:**
- Double-click the file: **TEST_DATABASE.bat**
- If you see ✅ "Database connected successfully!" → Great!
- If you see ❌ Error → Check your password in server\.env

**Start the project:**
- Double-click the file: **START_PROJECT.bat**
- Wait 10-20 seconds for it to start
- Two windows will open (Frontend and Backend servers)
- Your browser should automatically open to: **http://localhost:3000**

---

## 🎉 You're Done!

### What You'll See:

1. **Browser opens** to http://localhost:3000
2. You'll see the **Quiz Platform** home page
3. Click **"Register"** to create an account
4. Start creating quizzes!

---

## 📝 Understanding the Project Structure

```
Quiz_platform/
├── START_PROJECT.bat      ← Double-click this to start
├── TEST_DATABASE.bat      ← Double-click this to test
│
├── client/                ← Frontend (React) - what you see in browser
│   └── src/
│       ├── pages/         ← Different pages (Home, Login, etc.)
│       └── components/    ← Reusable UI pieces
│
├── server/                ← Backend (Express) - handles data
│   ├── routes/            ← API endpoints
│   ├── controllers/       ← Business logic
│   └── .env              ← Your database password is here
│
└── database/
    └── schema.sql         ← Database structure
```

---

## 🛠️ Common Issues & Solutions

### Issue 1: "Port 3000 already in use"
**Solution:** 
- Close other programs using port 3000
- Or in terminal, run: `npx kill-port 3000`

### Issue 2: "Database connection failed"
**Solutions:**
1. Make sure PostgreSQL is running
2. Check your password in `server\.env`
3. Make sure database `quiz_platform` exists in pgAdmin

### Issue 3: "Module not found" errors
**Solution:**
- Close all terminals
- Delete `node_modules` folders (in root, client, and server)
- Double-click `START_PROJECT.bat` again (it will reinstall)

### Issue 4: Browser doesn't open
**Solution:**
- Manually open browser
- Go to: http://localhost:3000

---

## 🎮 How to Use the Application

1. **Register** - Create a new account
2. **Login** - Sign in with your account
3. **Create Quiz** - Click "Create Quiz" and add questions
4. **Publish** - Save as draft or publish immediately
5. **Take Quiz** - Go to home page and take any published quiz
6. **View Profile** - See your quiz history and scores

---

## 🛑 How to Stop the Application

Press **Ctrl + C** in both terminal windows, or simply close them.

---

## 💡 Tips for Beginners

- **Don't panic if you see warnings** - As long as you see "Server is running on port 5000" and no red errors, you're good!
- **The first start is slow** - It needs to compile the React app (30-60 seconds)
- **Keep both terminal windows open** - One runs the frontend, one runs the backend
- **If something breaks** - Just close everything and run START_PROJECT.bat again

---

## 📞 Quick Reference

| What You Want | What To Do |
|---------------|------------|
| Start the app | Double-click **START_PROJECT.bat** |
| Stop the app | Press **Ctrl + C** in terminals |
| Test database | Double-click **TEST_DATABASE.bat** |
| Open in browser | http://localhost:3000 |
| View database | Open pgAdmin, connect to quiz_platform |
| Change password | Edit `server\.env` line 2 |

---

## 🎊 Congratulations!

You've successfully set up and run a full-stack web application with:
- ✅ React Frontend
- ✅ Node.js Backend
- ✅ PostgreSQL Database
- ✅ User Authentication
- ✅ Full Quiz Platform Features

**You're now a Node.js developer!** 🎉

---

Need help? Check the detailed documentation in **README.md** or **SETUP.md**
