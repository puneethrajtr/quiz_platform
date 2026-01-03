# 🚀 Quiz Platform - Quick Reference

## ⚡ Quick Start (3 Commands)

```bash
# 1. Install dependencies
npm install && cd client && npm install && cd ../server && npm install && cd ..

# 2. Setup database (after configuring PostgreSQL)
./setup-database.sh  # or setup-database.bat on Windows

# 3. Start development (after creating server/.env)
npm run dev
```

## 🔑 Essential Commands

### Development
```bash
npm run dev              # Start both frontend + backend
cd client && npm start   # Frontend only (port 3000)
cd server && npm run dev # Backend only (port 5000)
```

### Database
```bash
createdb quiz_platform                           # Create database
psql -d quiz_platform -f database/schema.sql     # Apply schema
psql -d quiz_platform                            # Connect to database
```

### Building
```bash
cd client && npm run build  # Build React app for production
```

## 📦 Project URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Base**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔐 Environment Variables

**server/.env**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/quiz_platform
JWT_SECRET=your_strong_secret_key_here
PORT=5000
NODE_ENV=development
```

## 📍 Key API Endpoints

### Auth
```
POST /api/auth/register    # Register user
POST /api/auth/login       # Login user
```

### Quiz
```
GET  /api/quizzes/published        # All published quizzes
GET  /api/quizzes/my-quizzes       # My quizzes (Protected)
POST /api/quizzes                  # Create quiz (Protected)
GET  /api/quizzes/:id              # Get single quiz
PUT  /api/quizzes/:id              # Update quiz (Protected)
DELETE /api/quizzes/:id            # Delete quiz (Protected)
POST /api/quizzes/:id/submit       # Submit answers (Protected)
```

### Attempts
```
GET /api/attempts/my-attempts      # My quiz attempts (Protected)
```

## 🗂️ Project Structure

```
Quiz_platform/
├── client/          # React frontend
├── server/          # Express backend
├── database/        # SQL schema
├── *.md            # Documentation
└── vercel.json     # Deployment config
```

## 💾 Database Tables

```sql
users       (id, email, password, created_at)
quizzes     (id, title, description, time_limit, status, author_id)
questions   (id, quiz_id, question_text, option1-4, correct_option)
attempts    (id, quiz_id, user_id, score, submitted_at)
```

## 🧪 Quick Test Flow

1. **Register**: http://localhost:3000/register
2. **Login**: http://localhost:3000/login
3. **Create Quiz**: http://localhost:3000/create-quiz
4. **View Quizzes**: http://localhost:3000/my-quizzes
5. **Take Quiz**: http://localhost:3000/
6. **View Profile**: http://localhost:3000/profile

## 🔧 Common Fixes

### Port in use
```bash
lsof -ti:5000 | xargs kill  # Kill process on port 5000
lsof -ti:3000 | xargs kill  # Kill process on port 3000
```

### Database connection error
```bash
pg_isready                  # Check PostgreSQL status
psql -l | grep quiz_platform  # Verify database exists
```

### Clear browser storage (logout issues)
```javascript
localStorage.clear()  # In browser console
```

## 🚀 Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables in Vercel dashboard:
#    - DATABASE_URL
#    - JWT_SECRET
#    - NODE_ENV=production

# 5. Deploy to production
vercel --prod
```

## 📚 Documentation Files

- **README.md** - Complete documentation
- **SETUP.md** - Quick setup guide
- **API_DOCUMENTATION.md** - API reference
- **PROJECT_SUMMARY.md** - Features overview
- **CHECKLIST.md** - Testing checklist
- **FILE_STRUCTURE.md** - File organization

## 🎯 Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Auth**: JWT, bcrypt
- **Deployment**: Vercel

## 🔐 Security Features

✅ Password hashing (bcrypt)
✅ JWT authentication
✅ Protected routes
✅ Authorization checks
✅ SQL injection prevention
✅ Input validation

## ✨ Key Features

✅ User registration & login
✅ Create/edit/delete quizzes
✅ Draft & publish quizzes
✅ Take quizzes with timer
✅ Auto-submit on timeout
✅ Score calculation
✅ Quiz history
✅ User profile

## 📞 Need Help?

1. Check **README.md** for detailed guide
2. Review **SETUP.md** for quick start
3. Consult **API_DOCUMENTATION.md** for API details
4. Use **CHECKLIST.md** for testing

---

**Built with ❤️ as a technical assessment project**

Good luck! 🎉
