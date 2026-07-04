import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="booking-wrapper">
      <div className="booking-card">
        <h1>❌ Payment Failed</h1>

        <p>Your payment could not be completed.</p>

        <button
          className="btn"
          onClick={() => navigate("/payment")}
        >
          Try Again
        </button>

        <button
          className="btn"
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;