## Implement Login & Logout Flow in React.js and Node.js
##### Create a simple login and logout system in a React.js and Node.js application using a database (SQLite). The flow should allow a user to: Register (sign up) with email and password. Log in using the registered credentials. Stay logged in using session/cookie-based authentication. Log out and clear the session.
## Tech Stack

**Client:** Vite React, TailwindCSS, Shadcn, magicUI

**Server:** Node, Express

## Project Setup (Local)

This project contains **frontend** and **backend** folders. Follow these steps to run it locally:

### 1. Clone the repository

```bash
git clone https://github.com/dev-devendra21/Klickks_assignment.git
cd Klickks_assignment
```

### 2. Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add required variables
SESSION_SECRET=secret-key
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Start backend server
npm run dev   # for development
# or
npm start     # for production
```

Backend will run at:

```
http://localhost:8000
```

### 3. Setup Frontend

```bash
# Open a new terminal and go to frontend folder
cd ../frontend

# Install dependencies
npm install

# Create a .env file (if required) and add API base URL
VITE_API_URL=http://localhost:8000

# Start frontend server
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# API Reference

## Register User

```http
POST /api/v1/user/register
```

Registers a new user.

### Request Body

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "data": {
    "id": 2,
    "email": "john.doe@example.com"
  },
  "message": "User created successfully."
}
```

---

## Login User

```http
POST /api/v1/user/login
```

Logs in an existing user.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Success Response

```json
{
  "message": "User logged in successfully",
  "session": {
    "id": 2,
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "success": true,
  "status": 200
}
```

---

## Logout User

```http
GET /api/v1/user/logout
```

Logs out the authenticated user.

### Success Response

```json
{
  "message": "User logged out successfully"
}
```

## Demo

Video Link:-
https://drive.google.com/file/d/1hIo-8mRnP_yGgFVwl-UWp1pyM0QR5zgD/view?usp=sharing


Frontend:- 
https://klickks-assignment-nine.vercel.app/login


backend:- 
https://klickks-assignment-backend-zio9.onrender.com



## Screenshots

![Dashboard Screenshot](https://res.cloudinary.com/ddox0bhgm/image/upload/v1757269898/Screenshot_2025-09-07_235815_d7wki7.png)


![Login Screenshot](https://res.cloudinary.com/ddox0bhgm/image/upload/v1757269897/Screenshot_2025-09-07_235725_ym0z7z.png)


![Signup Screenshot](https://res.cloudinary.com/ddox0bhgm/image/upload/v1757269897/Screenshot_2025-09-07_235747_lqjpui.png)

