# API Documentation & Testing Guide

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.vercel.app/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

---

## Quiz Endpoints

### Get Published Quizzes
```http
GET /api/quizzes/published
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Sample Quiz",
    "description": "A sample quiz",
    "time_limit": 10,
    "status": "published",
    "author_id": "uuid",
    "author_email": "author@example.com",
    "question_count": 5,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get My Quizzes (Protected)
```http
GET /api/quizzes/my-quizzes
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "My Quiz",
    "description": "Description",
    "time_limit": 15,
    "status": "draft",
    "question_count": 3,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Quiz by ID
```http
GET /api/quizzes/:id
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Sample Quiz",
  "description": "A sample quiz",
  "time_limit": 10,
  "status": "published",
  "author_id": "uuid",
  "created_at": "2024-01-01T00:00:00.000Z",
  "questions": [
    {
      "id": "uuid",
      "quiz_id": "uuid",
      "question_text": "What is 2+2?",
      "option1": "3",
      "option2": "4",
      "option3": "5",
      "option4": "6",
      "correct_option": 2,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create Quiz (Protected)
```http
POST /api/quizzes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Quiz",
  "description": "Quiz description",
  "time_limit": 10,
  "status": "published",
  "questions": [
    {
      "question_text": "What is 2+2?",
      "option1": "3",
      "option2": "4",
      "option3": "5",
      "option4": "6",
      "correct_option": 2
    },
    {
      "question_text": "Capital of France?",
      "option1": "London",
      "option2": "Berlin",
      "option3": "Paris",
      "option4": "Madrid",
      "correct_option": 3
    }
  ]
}
```

**Response (201):**
```json
{
  "message": "Quiz created successfully",
  "quiz": {
    "id": "uuid",
    "title": "New Quiz",
    "description": "Quiz description",
    "time_limit": 10,
    "status": "published",
    "author_id": "uuid",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Quiz (Protected)
```http
PUT /api/quizzes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Quiz Title",
  "description": "Updated description",
  "time_limit": 15,
  "status": "published",
  "questions": [
    {
      "question_text": "Updated question?",
      "option1": "A",
      "option2": "B",
      "option3": "C",
      "option4": "D",
      "correct_option": 1
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Quiz updated successfully"
}
```

### Delete Quiz (Protected)
```http
DELETE /api/quizzes/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Quiz deleted successfully"
}
```

### Submit Quiz Answers (Protected)
```http
POST /api/quizzes/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "question_id": "uuid",
      "selected_option": 2
    },
    {
      "question_id": "uuid",
      "selected_option": 3
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Quiz submitted successfully",
  "score": 2,
  "total": 2
}
```

---

## Attempt Endpoints

### Get My Attempts (Protected)
```http
GET /api/attempts/my-attempts
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "quiz_id": "uuid",
    "user_id": "uuid",
    "score": 8,
    "quiz_title": "Sample Quiz",
    "total_questions": 10,
    "submitted_at": "2024-01-01T12:00:00.000Z"
  }
]
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create Quiz (replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/quizzes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Quiz",
    "description": "A test quiz",
    "time_limit": 10,
    "status": "published",
    "questions": [{
      "question_text": "What is 2+2?",
      "option1": "3",
      "option2": "4",
      "option3": "5",
      "option4": "6",
      "correct_option": 2
    }]
  }'
```

### Get Published Quizzes
```bash
curl http://localhost:5000/api/quizzes/published
```

---

## Testing with Postman

1. Import collection or manually create requests
2. Set base URL as environment variable
3. After login, save token to environment variable
4. Use `{{token}}` in Authorization headers

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error message"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting (Production)

Consider implementing rate limiting in production:
- Authentication endpoints: 5 requests/minute
- Quiz creation: 10 requests/hour
- Quiz taking: 20 requests/hour

---

## Security Notes

1. Always use HTTPS in production
2. Store JWT tokens securely (httpOnly cookies in production)
3. Implement token refresh mechanism for better security
4. Add rate limiting to prevent abuse
5. Validate all inputs on server-side
6. Use prepared statements (parameterized queries) to prevent SQL injection

---

Happy Testing! 🚀
