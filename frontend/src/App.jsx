import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Booking = lazy(() => import("./pages/Booking"));
const Profile = lazy(() => import("./pages/Profile"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const BookingSuccess = lazy(() =>
  import("./pages/BookingSuccess")
);
const Admin = lazy(() => import("./pages/Admin"));
const Payment = lazy(() => import("./pages/Payment"));
const PaymentSuccess = lazy(() =>
  import("./pages/PaymentSuccess")
);
const PaymentFailed = lazy(() =>
  import("./pages/PaymentFailed")
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/booking"
            element={<Booking />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/mybookings"
            element={<MyBookings />}
          />

          <Route
            path="/success"
            element={<BookingSuccess />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment-failed"
            element={<PaymentFailed />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;