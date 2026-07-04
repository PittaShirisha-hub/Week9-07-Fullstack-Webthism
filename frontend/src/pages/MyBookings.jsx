import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Bookings
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://week8-part2-06-fullstack-webthism.onrender.com/api/bookings"
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Dashboard Statistics
  const totalBookings = useMemo(
    () => bookings.length,
    [bookings]
  );

  const pendingCount = useMemo(
    () =>
      bookings.filter(
        (b) => b.status === "Pending"
      ).length,
    [bookings]
  );

  const confirmedCount = useMemo(
    () =>
      bookings.filter(
        (b) => b.status === "Confirmed"
      ).length,
    [bookings]
  );

  const completedCount = useMemo(
    () =>
      bookings.filter(
        (b) => b.status === "Completed"
      ).length,
    [bookings]
  );

  const cancelledCount = useMemo(
    () =>
      bookings.filter(
        (b) => b.status === "Cancelled"
      ).length,
    [bookings]
  );

  const totalPaid = useMemo(() => {
    return bookings.reduce(
      (total, booking) =>
        total +
        (booking.serviceId?.price || 0),
      0
    );
  }, [bookings]);

  // Update Status
  const updateStatus = useCallback(
    async (id, status) => {
      try {
        await axios.put(
          `https://week8-part2-06-fullstack-webthism.onrender.com/api/bookings/${id}/status`,
          { status }
        );

        fetchBookings();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchBookings]
  );

  // Delete Booking
  const handleDelete = useCallback(
    async (id) => {
      try {
        await axios.delete(
          `https://week8-part2-06-fullstack-webthism.onrender.com/api/bookings/${id}`
        );

        fetchBookings();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchBookings]
  );

  return (
    <div className="container">
      <h1 className="page-title">
        My Bookings
      </h1>

      {/* Dashboard */}

      <div className="dashboard-cards">
        <div className="card">
          <h2>{totalBookings}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="card">
          <h2>{pendingCount}</h2>
          <p>Pending</p>
        </div>

        <div className="card">
          <h2>{confirmedCount}</h2>
          <p>Confirmed</p>
        </div>

        <div className="card">
          <h2>{completedCount}</h2>
          <p>Completed</p>
        </div>

        <div className="card">
          <h2>{cancelledCount}</h2>
          <p>Cancelled</p>
        </div>

        <div className="card">
          <h2>₹{totalPaid}</h2>
          <p>Total Paid</p>
        </div>
      </div>

      {loading ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Loading Bookings...
        </h2>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  {booking.serviceId?.title}
                </td>

                <td>
                  {booking.bookingDate}
                </td>

                <td>{booking.timeSlot}</td>

                <td>
                  {booking.status}
                </td>

                <td>
                  {booking.status ===
                    "Pending" && (
                    <>
                      <button
                        className="confirm-btn"
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "Confirmed"
                          )
                        }
                      >
                        Confirm
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "Cancelled"
                          )
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {booking.status ===
                    "Confirmed" && (
                    <button
                      className="complete-btn"
                      onClick={() =>
                        updateStatus(
                          booking._id,
                          "Completed"
                        )
                      }
                    >
                      Complete
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        booking._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;