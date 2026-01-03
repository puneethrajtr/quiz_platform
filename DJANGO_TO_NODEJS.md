# Node.js for Django/Flask Developers 🐍 → 🟢

## Quick Comparison

| Django/Flask | Node.js/Express | What It Does |
|--------------|-----------------|--------------|
| `python manage.py runserver` | `npm run dev` | Start development server |
| `pip install -r requirements.txt` | `npm install` | Install dependencies |
| `pip install package` | `npm install package` | Add new package |
| `python manage.py migrate` | Run SQL file or ORM migrations | Setup database |
| `python manage.py shell` | `node` (REPL) | Interactive shell |
| `settings.py` | `.env` file | Configuration |
| `requirements.txt` | `package.json` | Dependencies list |
| `venv/` | `node_modules/` | Dependencies folder |
| `models.py` | `models/` or `.sql` files | Database models |
| `views.py` | `controllers/` | Business logic |
| `urls.py` | `routes/` | URL routing |
| `templates/` | `client/src/` (React) | Frontend |

## Project Structure Comparison

### Django Project:
```
myproject/
├── manage.py
├── myproject/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── myapp/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── templates/
├── requirements.txt
└── venv/
```

### This Node.js Project:
```
Quiz_platform/
├── server/
│   ├── index.js          ← Like manage.py + wsgi.py
│   ├── .env              ← Like settings.py
│   ├── routes/           ← Like urls.py
│   ├── controllers/      ← Like views.py
│   └── package.json      ← Like requirements.txt
├── client/               ← Frontend (React)
│   └── src/
│       └── pages/        ← Like templates/
├── database/
│   └── schema.sql        ← Like models.py (but raw SQL)
└── node_modules/         ← Like venv/
```

## Common Commands

### Starting the Server

**Django:**
```bash
python manage.py runserver
# Runs on http://localhost:8000
```

**Node.js (This Project):**
```bash
npm run dev
# Runs on:
# - Backend: http://localhost:5000
# - Frontend: http://localhost:3000
```

### Installing Packages

**Django:**
```bash
pip install django-rest-framework
# Then add to INSTALLED_APPS in settings.py
```

**Node.js:**
```bash
npm install express
# Automatically added to package.json
```

### Database Setup

**Django:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Node.js (This Project):**
```bash
# Run schema.sql in pgAdmin or psql
# Or use: node server/setup-db.js
```

### Creating a New Route/View

**Django (views.py):**
```python
from django.http import JsonResponse

def get_quizzes(request):
    quizzes = Quiz.objects.all()
    return JsonResponse({'quizzes': list(quizzes.values())})
```

**Node.js (controllers/quiz.controller.js):**
```javascript
const getQuizzes = async (req, res) => {
  const result = await pool.query('SELECT * FROM quizzes');
  res.json({ quizzes: result.rows });
};
```

**Django (urls.py):**
```python
urlpatterns = [
    path('quizzes/', views.get_quizzes),
]
```

**Node.js (routes/quiz.routes.js):**
```javascript
router.get('/quizzes', getQuizzes);
```

## Key Differences

### 1. Async/Await
**Django (sync by default):**
```python
def my_view(request):
    data = MyModel.objects.all()
    return JsonResponse({'data': data})
```

**Node.js (async required):**
```javascript
const myController = async (req, res) => {
  const data = await pool.query('SELECT * FROM my_table');
  res.json({ data: data.rows });
};
```

### 2. Middleware
**Django:**
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    ...
]
```

**Node.js:**
```javascript
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
```

### 3. Environment Variables
**Django (settings.py):**
```python
SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', False)
```

**Node.js (.env):**
```env
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Access in code:**
```javascript
require('dotenv').config();
const secret = process.env.JWT_SECRET;
```

## How This Project Maps to Django

### Authentication
**Django:**
- `django.contrib.auth`
- `User` model built-in
- `@login_required` decorator

**This Project:**
- JWT tokens (manual)
- `users` table in PostgreSQL
- `authMiddleware` function

### Database Queries
**Django ORM:**
```python
users = User.objects.filter(is_active=True)
quiz = Quiz.objects.get(id=quiz_id)
Quiz.objects.create(title="New Quiz")
```

**This Project (Raw SQL):**
```javascript
const users = await pool.query('SELECT * FROM users WHERE is_active = true');
const quiz = await pool.query('SELECT * FROM quizzes WHERE id = $1', [quizId]);
await pool.query('INSERT INTO quizzes (title) VALUES ($1)', ['New Quiz']);
```

### Forms/Validation
**Django:**
- `forms.py` with Form classes
- Built-in validation

**This Project:**
- Manual validation in controllers
- Check in frontend (React) + backend

### Templates vs React
**Django Templates:**
```html
{% for quiz in quizzes %}
  <div>{{ quiz.title }}</div>
{% endfor %}
```

**React (this project):**
```jsx
{quizzes.map(quiz => (
  <div key={quiz.id}>{quiz.title}</div>
))}
```

## Running This Project (Django-Style Thinking)

Think of it as:

1. **Start Database Server** (like starting PostgreSQL for Django)
   - Open pgAdmin → This starts PostgreSQL

2. **Setup Database** (like `python manage.py migrate`)
   - Run `node server/setup-db.js`

3. **Start Dev Server** (like `python manage.py runserver`)
   - Run `npm run dev`

That's it! Same concept, different syntax.

## Common Issues & Django Equivalents

| Issue | Django Equivalent | Solution |
|-------|------------------|----------|
| "Port 5000 in use" | Port 8000 in use | Stop other server or change PORT in .env |
| "Module not found" | Package not in requirements.txt | Run `npm install` |
| "Database connection failed" | PostgreSQL not running | Start PostgreSQL service |
| ".env file missing" | settings.py missing | Create .env file |

## Useful NPM Commands (Like pip)

```bash
npm install           # Like: pip install -r requirements.txt
npm install package   # Like: pip install package
npm uninstall package # Like: pip uninstall package
npm run dev          # Like: python manage.py runserver
npm run build        # Like: python manage.py collectstatic
npm start            # Like: gunicorn (production)
```

## Summary

If you can build Django/Flask apps, you can totally do Node.js!

The concepts are the same:
- Routes → Controllers → Database → Response
- Just different syntax and tools

Main differences:
- No built-in ORM (we use raw SQL)
- Everything is async/await
- Frontend is separate (React, not templates)
- Package manager is npm (not pip)

You've got this! 🚀
