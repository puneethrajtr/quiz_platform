# Quiz Creation Platform

A complete full-stack web application for creating, managing, and taking quizzes with user authentication, built with React, Node.js, Express, and PostgreSQL.

## 🚀 Features

### User Authentication
- User registration with email and password
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes for quiz management
- User profile with quiz history

### Quiz Creation & Management
- Create quizzes with title, description, and time limit
- Add multiple-choice questions (4 options each)
- Save as draft or publish immediately
- Edit existing quizzes
- Delete quizzes
- Preview quiz before publishing
- Dynamic question addition/removal

### Quiz Taking
- Browse and take published quizzes
- Real-time countdown timer
- Auto-submit when time expires
- Manual submission
- Instant score calculation and display
- Quiz attempt history tracking

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Deployment**: Vercel-ready (serverless functions)

## 📁 Project Structure

```
Quiz_platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React Context (Auth)
│   │   ├── routes/        # Route protection
│   │   ├── App.jsx        # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth middleware
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── package.json
├── database/             # Database schema
│   └── schema.sql
├── vercel.json          # Vercel deployment config
├── .env.example         # Environment variables template
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Quiz_platform
```

### 2. Database Setup

1. Create a PostgreSQL database:
```bash
createdb quiz_platform
```

2. Run the schema file to create tables:
```bash
psql -d quiz_platform -f database/schema.sql
```

Or connect to your database and run the SQL commands from `database/schema.sql`.

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/quiz_platform
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

**Important**: Use a strong random string for JWT_SECRET in production!

### 4. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

Install server dependencies:
```bash
cd server
npm install
cd ..
```

### 5. Run the Application

#### Development Mode (with hot reload)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Frontend runs on http://localhost:3000

#### Or use the combined script from root:
```bash
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quizzes
- `GET /api/quizzes/published` - Get all published quizzes
- `GET /api/quizzes/my-quizzes` - Get user's quizzes (Protected)
- `GET /api/quizzes/:id` - Get single quiz
- `POST /api/quizzes` - Create new quiz (Protected)
- `PUT /api/quizzes/:id` - Update quiz (Protected)
- `DELETE /api/quizzes/:id` - Delete quiz (Protected)
- `POST /api/quizzes/:id/submit` - Submit quiz answers (Protected)

### Attempts
- `GET /api/attempts/my-attempts` - Get user's quiz attempts (Protected)

## 🚀 Deployment to Vercel

### 1. Prepare for Deployment

Ensure all code is committed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Set up PostgreSQL Database

Use a managed PostgreSQL service like:
- Vercel Postgres
- Supabase
- Neon
- Railway
- ElephantSQL

Get your connection string (DATABASE_URL).

### 3. Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set Environment Variables in Vercel Dashboard:
   - Go to your project settings
   - Add environment variables:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `JWT_SECRET` - A strong random secret key
     - `NODE_ENV` - Set to `production`

5. Redeploy after adding environment variables:
```bash
vercel --prod
```

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Configure environment variables
4. Deploy!

## 📊 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `created_at` (Timestamp)

### Quizzes Table
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text)
- `time_limit` (Integer, in minutes)
- `status` (String: 'draft' or 'published')
- `author_id` (UUID, Foreign Key → users.id)
- `created_at` (Timestamp)

### Questions Table
- `id` (UUID, Primary Key)
- `quiz_id` (UUID, Foreign Key → quizzes.id)
- `question_text` (Text)
- `option1` to `option4` (Strings)
- `correct_option` (Integer: 1-4)
- `created_at` (Timestamp)

### Attempts Table
- `id` (UUID, Primary Key)
- `quiz_id` (UUID, Foreign Key → quizzes.id)
- `user_id` (UUID, Foreign Key → users.id)
- `score` (Integer)
- `submitted_at` (Timestamp)

## 🔐 Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token-based authentication
- Protected API routes with middleware
- Authorization checks (users can only edit/delete their own quizzes)
- SQL injection prevention (parameterized queries)
- CORS enabled for cross-origin requests

## 🎨 Frontend Features

- Responsive design
- Loading states
- Error handling
- Form validation
- Real-time countdown timer
- Dynamic form management
- Context API for state management
- Protected routes

## 📝 Usage Guide

### For Quiz Creators

1. **Register/Login**: Create an account or login
2. **Create Quiz**: Click "Create Quiz" and fill in details
3. **Add Questions**: Add multiple-choice questions with 4 options
4. **Preview**: Preview your quiz before publishing
5. **Publish/Draft**: Save as draft or publish immediately
6. **Manage**: View, edit, or delete your quizzes from "My Quizzes"

### For Quiz Takers

1. **Browse Quizzes**: View all published quizzes on home page
2. **Take Quiz**: Click "Take Quiz" to start
3. **Answer Questions**: Select answers within time limit
4. **Submit**: Submit manually or wait for auto-submit
5. **View Score**: See your score immediately
6. **Track History**: View all attempts in your profile

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database exists and schema is created

### Port Already in Use
- Change PORT in .env file
- Kill process using the port: `lsof -ti:5000 | xargs kill`

### CORS Issues
- Ensure proxy is set in client/package.json
- Check CORS configuration in server/index.js

### JWT Token Errors
- Verify JWT_SECRET is set
- Check token expiration
- Clear localStorage and login again

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Create quiz (draft)
- [ ] Create quiz (published)
- [ ] Edit quiz
- [ ] Delete quiz
- [ ] Take quiz
- [ ] Timer countdown
- [ ] Auto-submit on timeout
- [ ] Score calculation
- [ ] View quiz history
- [ ] Protected routes

## 📦 Production Considerations

- Use strong JWT_SECRET (32+ characters, random)
- Enable PostgreSQL SSL in production
- Set up proper CORS origins (not wildcard)
- Implement rate limiting for API endpoints
- Add request logging and monitoring
- Set up database backups
- Use environment-specific configurations
- Implement proper error tracking (Sentry, etc.)

## 🤝 Contributing

This is a technical assessment project. Fork and modify as needed for your use case.

## 📄 License

MIT License - Feel free to use for learning and development.

## 👤 Author

Built as a technical assessment project demonstrating full-stack development skills.

---

**Happy Quizzing! 🎉**
