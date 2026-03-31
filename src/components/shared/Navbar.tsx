'use client';

import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <a href="/" className="navbar-logo">
                    <img src="/chikucabnewlogo.webp" alt="Chiku Cabs" style={{ height: '45px', width: 'auto' }} />
                </a>

                <div className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
                    <a href="/outstation-cabs" className="navbar-link">Outstation</a>
                    <a href="/local-sightseeing-taxi" className="navbar-link">Local Hire</a>
                    <a href="/airport-taxi" className="navbar-link">Airport Taxi</a>
                    <a href="/tempo-traveller-on-rent" className="navbar-link">Tempo Traveller</a>
                    <a href="/one-way-cabs" className="navbar-link">One Way Cab</a>
                </div>

                <div className="navbar-actions">
                    <a href="tel:+918448445504" className="btn-primary navbar-call-btn">
                        <span className="navbar-call-icon">📞</span> 8448445504
                    </a>
                    <button
                        className="navbar-hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger-line ${menuOpen ? 'hamburger-open' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'hamburger-open' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'hamburger-open' : ''}`}></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
