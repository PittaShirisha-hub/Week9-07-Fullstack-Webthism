import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mybookings");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="booking-wrapper">
      <div className="booking-card">
        <h1>🎉 Payment Successful!</h1>

        <p>Your booking has been confirmed successfully.</p>

        <p>You will be redirected to My Bookings in 3 seconds...</p>

        <button
          className="btn"
          onClick={() => navigate("/mybookings")}
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;