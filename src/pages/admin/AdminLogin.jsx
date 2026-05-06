import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState(''); // Django uses username by default
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if ALREADY logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/token/', {
                username,
                password,
            });

            if (response.data.access) {
                localStorage.setItem('token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid username or password');
            setLoading(false);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', textAlign: 'center', marginBottom: '10px' }}>
                    Bree Interiors
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px' }}>Admin Portal</p>

                {error && (
                    <div style={{ padding: '10px', backgroundColor: '#fce8e6', color: '#c53030', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', fontFamily: 'var(--font-body)' }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', fontFamily: 'var(--font-body)' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
