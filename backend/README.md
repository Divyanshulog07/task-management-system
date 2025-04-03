# Task Management System

A simple Task Management System built using Node.js, Express, MongoDB, and JWT authentication and SMTP server.

## Features

- User authentication with reset link (Register, Login, Forgot Password, Reset Password)
- Role-based access control (Admin/User)
- Task management (Create, Read, Update, Delete)
- JWT authentication & middleware security
- MongoDB database connection

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variables:

   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_smtp_username
   EMAIL_PASS=your_smtp_password
   ```

4. **Start the server:**

   ```sh
   npm start
   ```

   The server will run on `http://localhost:4000`.

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Send reset password link
- `POST /api/auth/reset-password/:token` - Reset user password

### Task Routes

- `POST /api/tasks` - Create a task (Admin and User)
- `GET /api/tasks` - Get Own tasks (User)
- `PUT /api/tasks/:id` - Update Own task (User)
- `PATCH /api/tasks/:id/completed` - Mark Task Completed (User)
- `GET /api/tasks//users` - Get All Users With Tasks (Only Admin)
- `PUT /api/tasks//admin/:id` - Update Any Task (Only Admin)
- `DELETE /api/tasks/:id` - Delete a task (Only Admin)

## License

This project is licensed under the MIT License.
