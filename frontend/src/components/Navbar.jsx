import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/register">Register</Link>

      <Link to="/login">Login</Link>

      <Link to="/booking">Booking</Link>

      <Link to="/profile">Profile</Link>

      <Link to="/mybookings">My Bookings</Link>

      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;