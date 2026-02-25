import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            <header className="header">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                    <div className="logo" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '600' }}>
                        Bree <span style={{ color: 'var(--color-terracotta)' }}>Interiors</span>.
                    </div>
                    <nav className="nav">
                        <ul style={{ display: 'flex', listStyle: 'none', gap: '30px', alignItems: 'center' }}>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/portfolio">Portfolio</a></li>
                            <li><a href="/journey">The Journey</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact" style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-warm-white)' }}>Contact</a></li>
                        </ul>
                    </nav>
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
