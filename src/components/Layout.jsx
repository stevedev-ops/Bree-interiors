import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNav = () => setIsNavOpen(false);
    return (
        <div className="layout">
            <header className="header">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                    <div className="logo" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '600' }}>
                        Bree <span style={{ color: 'var(--color-terracotta)' }}>Interiors</span>.
                    </div>
                    <nav className="nav">
                        {/* Hamburger Icon (Mobile Only) */}
                        <div className="mobile-only" style={{ cursor: 'pointer', zIndex: 1001, position: isNavOpen ? 'fixed' : 'static', right: isNavOpen ? '30px' : 'auto' }} onClick={() => setIsNavOpen(!isNavOpen)}>
                            {isNavOpen ? <X size={28} /> : <Menu size={28} />}
                        </div>

                        {/* Nav Links */}
                        <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
                            <li><Link to="/" onClick={closeNav}>Home</Link></li>
                            <li><Link to="/about" onClick={closeNav}>About</Link></li>
                            <li><Link to="/portfolio" onClick={closeNav}>Portfolio</Link></li>
                            <li><Link to="/journey" onClick={closeNav}>The Journey</Link></li>
                            <li><Link to="/services" onClick={closeNav}>Services</Link></li>
                            <li><Link to="/blog" onClick={closeNav}>Blog</Link></li>
                            <li><Link to="/contact" onClick={closeNav} style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-warm-white)' }}>Contact</Link></li>
                        </ul>
                    </nav>

                    {/* Overlay for mobile drawer */}
                    <div className={`nav-overlay mobile-only ${isNavOpen ? 'active' : ''}`} onClick={closeNav}></div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="footer" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)', padding: '60px 0', marginTop: '100px' }}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Bree Interiors. Savannah Minimalism™.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
