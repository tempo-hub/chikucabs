"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <img
            src="/chikucabnewlogo.webp"
            alt="Chiku Cabs"
            style={{ height: "45px", width: "auto" }}
          />
        </Link>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
          <Link href="/outstation-cabs" className="navbar-link">
            Outstation
          </Link>
          <Link href="/local-sightseeing-taxi" className="navbar-link">
            Local Hire
          </Link>
          <Link href="/airport-taxi" className="navbar-link">
            Airport Taxi
          </Link>
          <Link href="/tempo-traveller-on-rent" className="navbar-link">
            Tempo Traveller
          </Link>
          <Link href="/one-way-cabs" className="navbar-link">
            One Way Cab
          </Link>
          <Link href="/blogs" className="navbar-link">
            Blogs
          </Link>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <a href="tel:+918448445504" className="btn-primary navbar-call-btn">
            📞 8448445504
          </a>

          {/* Hamburger */}
          <button
            className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}