import { Link } from "react-router-dom";

function BookingSuccess() {
  return (
    <div className="success-page">
      <div className="success-card">
        <h1>✅ Booking Confirmed</h1>

        <p>
          Your appointment has been booked
          successfully.
        </p>

        <Link to="/my-bookings">
          <button className="btn">
            View My Bookings
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingSuccess;