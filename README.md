# 💇‍♀️ Service Booking Platform

A Full Stack MERN application that allows users to browse beauty & wellness services, book appointments, make payments, receive email and SMS notifications, and manage bookings through an admin dashboard.

---

# 🚀 Live Demo

### Frontend
https://week8-part2-06-fullstack-webthism.vercel.app

### Backend API
https://week8-part2-06-fullstack-webthism.onrender.com

---

# 📂 GitHub Repository

https://github.com/PittaShirisha-hub/Week8-part2--06-Fullstack-Webthism

---

# 📖 Project Overview

The Service Booking Platform enables customers to:

- Register and Login
- Browse available services
- Book appointments
- Make payments
- Receive Email Notifications
- Receive SMS Notifications
- View booking history
- Manage bookings

The Admin can:

- Add Services
- Update Services
- Delete Services
- View all bookings

---

# ✨ Features

## User Features

- User Registration
- User Login using JWT Authentication
- Browse Services
- Book Appointments
- View Booking History
- Online Payment
- Cash Payment
- Email Notification
- SMS Notification

---

## Admin Features

- Add New Service
- Edit Service
- Delete Service
- Manage Services
- View Dashboard

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Authentication

- JWT (JSON Web Token)
- bcryptjs

---

## Notifications

- Nodemailer (Email)
- Twilio (SMS)

---

## Security

- Helmet
- CORS
- Express Rate Limit
- XSS Clean

---

## Performance

- React Lazy Loading
- React Suspense
- useMemo
- useCallback
- MongoDB Indexing
- Node Cache
- Optimized Queries

---

# 📁 Project Structure

```
service-booking-platform

│── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json

│── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json

│── README.md
│── Testing_Report.md
│── Performance_Report.md
│── Security_Audit.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/PittaShirisha-hub/Week8-part2--06-Fullstack-Webthism.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

JWT_SECRET=xxxxxxxxxxxxxxxx

EMAIL_USER=xxxxxxxx@gmail.com
EMAIL_PASS=xxxxxxxxxxxxxxxx

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

Start Backend

```bash
npm start
```

or

```bash
node server.js
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Authentication

JWT Authentication is implemented.

- User Registration
- User Login
- Secure Token Generation
- Password Hashing using bcrypt

---

# 💳 Payment

Supports

- Cash Payment
- Card Payment

Payment information is stored in MongoDB.

---

# 📧 Email Notification

Booking confirmation emails are sent using:

- Nodemailer
- Gmail SMTP

---

# 📱 SMS Notification

SMS notifications are sent using:

- Twilio API

---

# 🚀 Performance Optimizations

Frontend

- React.lazy()
- Suspense
- Lazy Loading Images
- useMemo()
- useCallback()

Backend

- MongoDB Indexes
- lean()
- select()
- Node Cache
- Optimized Queries

---

# 🔒 Security Features

- Helmet
- JWT Authentication
- Express Rate Limiting
- CORS Configuration
- XSS Protection
- Environment Variables

---

# 🧪 Testing

Total Test Cases: **20**

Passed: **20**

Failed: **0**

Result: **PASS**

See:

- Testing_Report.md

---

# 📊 Reports

This project includes:

- Testing_Report.md
- Performance_Report.md
- Security_Audit.md

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Login
- Register
- Booking
- Payment
- My Bookings
- Admin Dashboard

---

# 👩‍💻 Author

**Pitta Shirisha**

GitHub

https://github.com/PittaShirisha-hub

---

# 📄 License

This project is created for educational purposes as part of the Full Stack Development Week 9 assignment.

---

# 🎯 Week 9 Deliverables Completed

✅ Frontend Performance Optimization

✅ Backend Performance Optimization

✅ MongoDB Indexing

✅ Node Cache

✅ React Lazy Loading

✅ useMemo

✅ useCallback

✅ Helmet Security

✅ JWT Authentication

✅ Rate Limiting

✅ CORS Configuration

✅ XSS Protection

✅ Email Notifications

✅ SMS Notifications

✅ 20 Test Cases

✅ Performance Report

✅ Security Audit Report

✅ Updated Documentation

✅ GitHub Repository# Week9-07-Fullstack-Webthism
