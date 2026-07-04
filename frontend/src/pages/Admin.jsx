import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";

function Admin() {
  const emptyForm = {
    title: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  };

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Services
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://week8-part2-06-fullstack-webthism.onrender.com/api/services"
      );

      setServices(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // useMemo
  const totalValue = useMemo(() => {
    return services.reduce(
      (sum, s) => sum + Number(s.price || 0),
      0
    );
  }, [services]);

  const serviceList = useMemo(() => {
    return services;
  }, [services]);

  // Handle Input
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const clearForm = useCallback(() => {
    setEditingId(null);
    setFormData(emptyForm);
  }, []);

  const saveService = async () => {
    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.price ||
        !formData.duration ||
        !formData.image
      ) {
        alert("Please fill all fields.");
        return;
      }

      if (editingId) {
        await axios.put(
          `https://week8-part2-06-fullstack-webthism.onrender.com/api/services/${editingId}`,
          formData
        );

        alert("Service Updated Successfully");
      } else {
        await axios.post(
          "https://week8-part2-06-fullstack-webthism.onrender.com/api/services",
          formData
        );

        alert("Service Added Successfully");
      }

      clearForm();
      fetchServices();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const editService = useCallback((service) => {
    setEditingId(service._id);

    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const deleteService = useCallback(
    async (id) => {
      if (!window.confirm("Delete this service?"))
        return;

      try {
        await axios.delete(
          `https://week8-part2-06-fullstack-webthism.onrender.com/api/services/${id}`
        );

        fetchServices();
      } catch (err) {
        console.log(err);
      }
    },
    [fetchServices]
  );

  return (
    <div className="container">
      <h1 className="page-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>{serviceList.length}</h2>
          <p>Total Services</p>
        </div>

        <div className="card">
          <h2>₹{totalValue}</h2>
          <p>Total Service Value</p>
        </div>
      </div>

      <div className="booking-card">
        <h2>
          {editingId
            ? "Edit Service"
            : "Add New Service"}
        </h2>

        <input
          className="time-input"
          name="title"
          placeholder="Service Name"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="time-input"
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className="btn"
            onClick={saveService}
          >
            {editingId
              ? "Update Service"
              : "Add Service"}
          </button>

          {editingId && (
            <button
              className="cancel-btn"
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Loading Services...
        </h2>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Service</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {serviceList.map((service) => (
              <tr key={service._id}>
                <td>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td>{service.title}</td>

                <td>₹{service.price}</td>

                <td>{service.duration}</td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent:
                        "center",
                    }}
                  >
                    <button
                      className="confirm-btn"
                      onClick={() =>
                        editService(service)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteService(
                          service._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;