# Testing Report

## Project Name
Service Booking Platform

## Objective
The purpose of testing is to verify that all major features of the Service Booking Platform work correctly.

---

## Backend Test Cases

| Test ID | Module | Test Case | Expected Result | Status |
|----------|---------|-----------|-----------------|--------|
| TC-01 | User Registration | Register a new user | User registered successfully | ✅ Pass |
| TC-02 | User Login | Login with valid credentials | Login successful and JWT token generated | ✅ Pass |
| TC-03 | User Login | Login with invalid password | Error message displayed | ✅ Pass |
| TC-04 | Services | Get all services | List of services displayed | ✅ Pass |
| TC-05 | Services | Add new service | Service added successfully | ✅ Pass |
| TC-06 | Services | Update service | Service updated successfully | ✅ Pass |
| TC-07 | Services | Delete service | Service deleted successfully | ✅ Pass |
| TC-08 | Booking | Create booking | Booking created successfully | ✅ Pass |
| TC-09 | Booking | Confirm booking | Booking status changed to Confirmed | ✅ Pass |
| TC-10 | Booking | Cancel booking | Booking status changed to Cancelled | ✅ Pass |
| TC-11 | Booking | Complete booking | Booking status changed to Completed | ✅ Pass |
| TC-12 | Payment | Make payment | Payment successful | ✅ Pass |
| TC-13 | Email Notification | Booking confirmation email | Email received successfully | ✅ Pass |
| TC-14 | SMS Notification | Booking confirmation SMS | SMS received successfully | ✅ Pass |
| TC-15 | Dashboard | View bookings | Booking list displayed correctly | ✅ Pass |

---

## Frontend Test Cases

| Test ID | Page | Expected Result | Status |
|----------|------|-----------------|--------|
| TC-16 | Home | Home page loads successfully | ✅ Pass |
| TC-17 | Login | Login page works correctly | ✅ Pass |
| TC-18 | Register | Registration page works correctly | ✅ Pass |
| TC-19 | Booking | Booking page loads correctly | ✅ Pass |
| TC-20 | Admin Dashboard | Admin dashboard works correctly | ✅ Pass |

---

## Conclusion

All frontend and backend functionalities were tested successfully.

Total Test Cases: **20**

Passed: **20**

Failed: **0**

Result: **PASS**