# Pre-Deployment Checklist

## ✅ Before Running Locally

### Environment Setup
- [ ] PostgreSQL installed and running
- [ ] Node.js v16+ installed
- [ ] Git repository initialized

### Database Configuration
- [ ] Database created: `quiz_platform`
- [ ] Schema applied from `database/schema.sql`
- [ ] Database connection tested

### Environment Variables
- [ ] `server/.env` file created
- [ ] `DATABASE_URL` configured correctly
- [ ] `JWT_SECRET` set to a strong random string
- [ ] `PORT` configured (default: 5000)
- [ ] `NODE_ENV` set to `development`

### Dependencies
- [ ] Root dependencies installed: `npm install`
- [ ] Client dependencies installed: `cd client && npm install`
- [ ] Server dependencies installed: `cd server && npm install`

## ✅ Local Testing Checklist

### Authentication
- [ ] User can register with email and password
- [ ] Registration validates email format
- [ ] Registration requires minimum 6-character password
- [ ] Duplicate email registration prevented
- [ ] User can login with correct credentials
- [ ] Login fails with incorrect credentials
- [ ] User can logout
- [ ] Protected routes redirect to login when not authenticated
- [ ] User stays logged in after page refresh

### Quiz Creation
- [ ] Authenticated user can access create quiz page
- [ ] Quiz requires title, description, and time limit
- [ ] Can add multiple questions dynamically
- [ ] Each question requires all 4 options
- [ ] Can select correct answer for each question
- [ ] Can remove questions (minimum 1 required)
- [ ] Can preview quiz before publishing
- [ ] Can save as draft
- [ ] Can publish quiz immediately
- [ ] Validation prevents empty fields

### Quiz Management
- [ ] User can view their own quizzes
- [ ] Quiz list shows draft/published status
- [ ] User can edit their own quizzes
- [ ] User can delete their own quizzes (with confirmation)
- [ ] User cannot edit/delete quizzes created by others
- [ ] Published quizzes appear on home page
- [ ] Draft quizzes do not appear on home page

### Quiz Taking
- [ ] Anyone can view published quizzes
- [ ] Quiz displays correct information (title, description, time)
- [ ] Timer starts when quiz begins
- [ ] Timer counts down correctly
- [ ] Timer shows warning when < 60 seconds
- [ ] Can select answers for each question
- [ ] Can change selected answers
- [ ] Can submit quiz manually
- [ ] Quiz auto-submits when timer reaches 0
- [ ] Score calculated correctly
- [ ] Score displayed immediately after submission

### Profile & History
- [ ] User can view their profile
- [ ] Profile shows email address
- [ ] Profile shows quiz creation history
- [ ] Profile shows quiz attempt history
- [ ] Attempt history shows scores and dates
- [ ] Quiz creation history shows status

### UI/UX
- [ ] Navbar displays correctly
- [ ] Navigation links work
- [ ] Loading states display during API calls
- [ ] Error messages display when errors occur
- [ ] Success messages display on successful actions
- [ ] Empty states display when no data
- [ ] Forms are responsive
- [ ] Buttons have hover effects
- [ ] Confirmation prompts for destructive actions

### API Testing
- [ ] Health check endpoint works: `/api/health`
- [ ] Registration endpoint works: `POST /api/auth/register`
- [ ] Login endpoint works: `POST /api/auth/login`
- [ ] Get published quizzes works: `GET /api/quizzes/published`
- [ ] Create quiz works: `POST /api/quizzes` (with token)
- [ ] Update quiz works: `PUT /api/quizzes/:id` (with token)
- [ ] Delete quiz works: `DELETE /api/quizzes/:id` (with token)
- [ ] Submit quiz works: `POST /api/quizzes/:id/submit` (with token)
- [ ] Get attempts works: `GET /api/attempts/my-attempts` (with token)

## ✅ Pre-Deployment to Vercel

### Code Quality
- [ ] No console.errors in production code
- [ ] All dependencies are in package.json
- [ ] No sensitive data in code (hardcoded credentials)
- [ ] .env files are in .gitignore
- [ ] No unnecessary files committed

### Configuration
- [ ] `vercel.json` present and configured
- [ ] `.env.vercel.example` documented
- [ ] Database migrations ready
- [ ] Build scripts working locally

### Database (Production)
- [ ] Production PostgreSQL database provisioned
- [ ] Database schema applied to production database
- [ ] Database connection string obtained
- [ ] SSL enabled for database connection

### Environment Variables for Vercel
- [ ] `DATABASE_URL` added to Vercel project
- [ ] `JWT_SECRET` added to Vercel project (strong random key)
- [ ] `NODE_ENV` set to `production`

### Testing Before Deploy
- [ ] Frontend builds successfully: `cd client && npm run build`
- [ ] Backend runs without errors: `cd server && npm start`
- [ ] All API endpoints tested with production-like data
- [ ] No CORS issues in production configuration

## ✅ Post-Deployment Verification

### Vercel Deployment
- [ ] Deployment successful on Vercel
- [ ] No build errors
- [ ] Environment variables set correctly
- [ ] API routes accessible

### Production Testing
- [ ] Home page loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Quiz creation works
- [ ] Quiz taking works
- [ ] Score calculation correct
- [ ] All navigation works
- [ ] No console errors in browser

### Performance
- [ ] Page load time acceptable
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] Images/assets loading properly

### Security
- [ ] HTTPS enabled
- [ ] JWT tokens secure
- [ ] No sensitive data exposed in responses
- [ ] CORS configured properly
- [ ] SQL injection prevention tested
- [ ] Authorization working correctly

## ✅ Documentation

- [ ] README.md complete and accurate
- [ ] SETUP.md clear and tested
- [ ] API_DOCUMENTATION.md comprehensive
- [ ] PROJECT_SUMMARY.md up to date
- [ ] Environment variable examples provided
- [ ] Database setup scripts working

## 🎯 Final Check

- [ ] All features from requirements implemented
- [ ] No critical bugs
- [ ] Code is clean and well-commented
- [ ] User experience is smooth
- [ ] Application is production-ready

---

## 📝 Notes

Write any issues or notes here during testing:

```
Issue:
Resolution:

Issue:
Resolution:
```

---

**Status**: ⬜ Not Started | 🟨 In Progress | ✅ Complete

**Date Completed**: _______________

**Deployed URL**: _______________

**Test User Credentials**: 
- Email: _______________
- Password: _______________

---

Good luck with your deployment! 🚀
