export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="footer-logo inline-block bg-white p-2 rounded-lg mb-4">
              <img
                src="/chikucabnewlogo.webp"
                alt="Chiku Cabs"
                style={{ height: "45px", width: "auto" }}
              />
            </div>
            <p className="footer-desc">
              India's most trusted cab service with 1 Lakh+ completed trips.
              Premium vehicles, verified drivers, and transparent pricing across
              100+ cities.
            </p>
            <div className="footer-contact-row">
              <a href="tel:+918448445504" className="footer-phone">
                📞 +91-8448445504
              </a>
              <a
                href="https://wa.me/918448445504"
                className="footer-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li>
                <a href="/outstation-cabs">Outstation Cabs</a>
              </li>
              <li>
                <a href="/one-way-cabs">One Way Cabs</a>
              </li>
              <li>
                <a href="/local-sightseeing-taxi">Local Sightseeing</a>
              </li>
              <li>
                <a href="/airport-taxi">Airport Taxi</a>
              </li>
              <li>
                <a href="/tempo-traveller-on-rent">Tempo Traveller</a>
              </li>
              <li>
                <a href="/car-rental">Car Rental</a>
              </li>
              <li>
                <a href="/bus-on-rent">Bus on Rent</a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/car-hire">Car Hire</a>
              </li>
              <li>
                <a href="/hire-driver">Hire a Driver</a>
              </li>
              <li>
                <a href="/cab-on-rent">Cab on Rent</a>
              </li>
              <li>
                <a href="/attach-taxi">Attach Your Taxi</a>
              </li>
              <li>
                <a href="/cab-service-for-round-trip">Round Trip Cabs</a>
              </li>
              <li>
                <a href="/innova-car-rental">Innova Car Rental</a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-info">
              <p>📍 Noida Sector 2, Noida, UP - 201301</p>
              <p>📞 +91-8448445504</p>
              <p>📧 info@chikucabs.com</p>
              <p>🕐 24/7 Customer Support</p>
            </div>
            <div className="footer-trust-badges">
              <span className="trust-badge">🛡️ Verified</span>
              <span className="trust-badge">⭐ 4.9 Rated</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Chiku Cabs. All Rights Reserved. |{" "}
            <a href="/term-and-condition">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
