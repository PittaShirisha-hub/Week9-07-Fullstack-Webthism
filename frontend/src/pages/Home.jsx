import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://week8-part2-06-fullstack-webthism.onrender.com/api/services"
        );

        setServices(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // useMemo (Performance Optimization)
  const serviceList = useMemo(() => {
    return services;
  }, [services]);

  // useCallback (Performance Optimization)
  const scrollToServices = useCallback(() => {
    document
      .querySelector(".services-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }, []);

  return (
    <>
      {/* HERO SECTION */}

      <section className="hero">
        <div className="hero-content">
          <h1>
            Book Premium Beauty & Wellness
            Services
          </h1>

          <p>
            Trusted Professionals • Instant
            Booking • Secure Experience
          </p>

          <button
            className="hero-btn"
            onClick={scrollToServices}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* SERVICES */}

      <div className="container services-section">
        <h1 className="page-title">
          Featured Services
        </h1>

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
          <div className="service-grid">
            {serviceList.map((service) => (
              <div
                className="service-card"
                key={service._id}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />

                <div className="service-body">
                  <h2>{service.title}</h2>

                  <p>{service.description}</p>

                  <span>
                    ⏰ {service.duration}
                  </span>

                  <h3>
                    ₹{service.price}
                  </h3>

                  <Link
                    to="/booking"
                    state={{ service }}
                  >
                    <button className="btn">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TESTIMONIALS */}

      <section className="testimonials">
        <h1>
          What Our Customers Say
        </h1>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
              Amazing service experience and
              hassle-free booking process.
            </p>

            <h4>- Shankar</h4>
          </div>

          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
              Professional staff and excellent
              customer support.
            </p>

            <h4>- Shivani</h4>
          </div>

          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
              Best booking platform I've used.
              Highly recommended.
            </p>

            <h4>- Shirisha</h4>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <h2>ServiceHub</h2>

        <p>
          Professional Service Booking
          Platform
        </p>

        <p>
          📧 support@servicehub.com
        </p>

        <p>
          📞 +91 9876543210
        </p>

        <p>
          © 2026 All Rights Reserved
        </p>
      </footer>
    </>
  );
}

export default Home;