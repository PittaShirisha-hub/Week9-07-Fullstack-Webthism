import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData;

  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);

  if (!bookingData) {
    return (
      <div className="booking-wrapper">
        <div className="booking-card">
          <h2>No Booking Found</h2>
          <p>Please book a service first.</p>

          <button
            className="btn"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Card Validation
      if (paymentMethod === "Card") {
        if (
          !cardName ||
          !cardNumber ||
          !expiry ||
          !cvv
        ) {
          alert("Please fill all card details.");
          setLoading(false);
          return;
        }
      }

      // UPI Validation
      if (paymentMethod === "UPI") {
        if (!upi) {
          alert("Please enter UPI ID.");
          setLoading(false);
          return;
        }
      }

      console.log("Booking Data:", bookingData);

      // Create Booking
      const bookingRes = await axios.post(
        "https://week8-part2-06-fullstack-webthism.onrender.com/api/bookings",
        bookingData
      );

      console.log("Booking Response:", bookingRes.data);

      // Get Booking ID
      const bookingId =
        bookingRes.data.booking?._id ||
        bookingRes.data._id;

      if (!bookingId) {
        alert("Booking ID not received.");
        setLoading(false);
        return;
      }

      // Save Payment
      const paymentRes = await axios.post(
        "https://week8-part2-06-fullstack-webthism.onrender.com/api/payments",
        {
          bookingId,
          userId: bookingData.userId,
          amount: bookingData.amount,
          paymentMethod,
          paymentStatus: "Paid",
        }
      );

      console.log(paymentRes.data);

      alert("Payment Successful!");

      navigate("/payment-success");
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);

        alert(
          error.response.data.message ||
            "Payment Failed"
        );
      } else {
        alert("Server Error");
      }

      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-card">

        <h1>Secure Payment</h1>

        <h2>{bookingData.serviceTitle}</h2>

        <h3>₹{bookingData.amount}</h3>

        <hr />

        <h3>Booking Summary</h3>

        <p>
          <strong>Date:</strong>{" "}
          {bookingData.bookingDate}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {bookingData.timeSlot}
        </p>

        <br />

        <h3>Select Payment Method</h3>

        <select
          className="time-input"
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >
          <option>Card</option>
          <option>UPI</option>
          <option>Cash</option>
        </select>

        {paymentMethod === "Card" && (
          <>
            <input
              className="time-input"
              type="text"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) =>
                setCardName(e.target.value)
              }
            />

            <input
              className="time-input"
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value)
              }
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                className="time-input"
                type="text"
                placeholder="MM/YYYY"
                value={expiry}
                onChange={(e) =>
                  setExpiry(e.target.value)
                }
              />

              <input
                className="time-input"
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value)
                }
              />
            </div>
          </>
        )}

        {paymentMethod === "UPI" && (
          <input
            className="time-input"
            type="text"
            placeholder="Enter UPI ID"
            value={upi}
            onChange={(e) =>
              setUpi(e.target.value)
            }
          />
        )}

        {paymentMethod === "Cash" && (
          <p
            style={{
              color: "green",
              fontWeight: "600",
            }}
          >
            You can pay at the service location.
          </p>
        )}

        <button
          className="btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Pay ₹${bookingData.amount}`}
        </button>

      </div>
    </div>
  );
}

export default Payment;