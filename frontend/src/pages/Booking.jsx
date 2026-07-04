import { useState } from "react";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service;

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const handleBooking = () => {
    if (!time) {
      alert("Please select a time");
      return;
    }

    const bookingData = {
      userId: "123",
      serviceId: service?._id,
      serviceTitle: service?.title,
      amount: service?.price,
      bookingDate: date.toISOString().split("T")[0],
      timeSlot: time,
      status: "Pending",
    };

    navigate("/payment", {
      state: {
        bookingData,
      },
    });
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-card">
        <h1>Schedule Appointment</h1>

        <h2>{service?.title}</h2>

        <h3>₹{service?.price}</h3>

        <label>Select Date</label>

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          className="date-input"
        />

        <label>Select Time</label>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-input"
        />

        <button
          className="btn"
          onClick={handleBooking}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Booking;