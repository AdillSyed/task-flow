# TaskFlow – MERN Task Management Backend

TaskFlow is a simple MERN-based backend application built to demonstrate core full-stack fundamentals such as authentication, protected routes, RESTful APIs, middleware usage, and MongoDB data modeling.

This project focuses on **clarity, correctness, and explainability**, rather than over-engineering.

---

## 🚀 Features

- User Authentication (Register / Login / Logout)
- JWT-based authentication stored in **HTTP-only cookies**
- Protected routes using authentication middleware
- Task CRUD operations (Create, Read, Update, Delete)
- User-specific data access (users can only access their own tasks)
- Centralized error handling
- Request validation middleware
- Clean and scalable project structure

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

**Utilities**
- cookie-parser
- dotenv
- CORS

---

## 📂 Project Structure

backend/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── task.controller.js
│ ├── models/
│ │ ├── user.model.js
│ │ └── task.model.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── task.routes.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ ├── error.middleware.js
│ │ └── validate.middleware.js
│ ├── app.js
│ └── server.js
├── .env
└── package.json

---

## 🔐 Authentication Flow (JWT + Cookies)

1. User registers or logs in using email and password
2. Passwords are hashed using bcrypt before storing in MongoDB
3. On successful login:
   - A JWT is generated on the server
   - The JWT is stored in an **HTTP-only cookie**
4. For protected routes:
   - Auth middleware reads the token from cookies
   - JWT is verified
   - User ID is attached to `req.user`
5. If token is missing or invalid, access is denied

**Why HTTP-only cookies?**
- Prevents access from JavaScript (mitigates XSS attacks)
- More secure than storing tokens in localStorage

---

## 🔁 Application Workflow

Client Request
↓
Express Route
↓
Validation Middleware
↓
Auth Middleware (if protected)
↓
Controller
↓
MongoDB (via Mongoose)
↓
Response to Client

---

## 🧩 Middleware Used

### 1. Authentication Middleware
- Verifies JWT from cookies
- Attaches authenticated user to request
- Protects private routes

### 2. Error Handling Middleware
- Centralized error handling
- Prevents repetitive try/catch blocks
- Returns consistent error responses

### 3. Validation Middleware
- Validates incoming request data
- Prevents invalid or incomplete data from reaching controllers

---

## 📌 API Endpoints

### Auth Routes

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

### Task Routes (Protected)

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

---

## 🧪 Example Use Case

- User logs in
- JWT cookie is set
- User creates tasks
- Tasks are stored with a reference to the user
- Only the authenticated user can read/update/delete their tasks

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

---

## ▶️ Running the Project Locally

```bash
npm install
npm run dev

Server will start on: http://localhost:5000

Health check: GET /api/health

🚧 Future Improvements

* Role-based access control (Admin/User)
* Refresh token implementation
* Frontend integration (React)
* Input validation using a library (Joi / Zod)
* Pagination for tasks

🧠 Why This Project?

* This project was built to:
* Strengthen MERN fundamentals
* Demonstrate backend architecture and best practices
* Show understanding of authentication, middleware, and REST APIs
* Serve as a solid foundation for full-stack applications

---
📌 Author

Built by Syed as part of MERN stack skill enhancement.