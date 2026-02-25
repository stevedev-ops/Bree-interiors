import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session) {
                navigate('/admin/login');
            } else {
                setSession(session);
            }
            setLoading(false);
        };
        checkSession();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            {/* Sidebar */}
            <aside style={{ width: '260px', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-warm-white)', padding: '30px 20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '50px', paddingLeft: '10px' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-sand)' }}>Bree Interiors</h2>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase' }}>Admin Panel</span>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '12px 15px', color: activeTab === 'dashboard' ? 'var(--color-sand)' : 'white', backgroundColor: activeTab === 'dashboard' ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px', textAlign: 'left' }}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>

                    <button
                        onClick={() => setActiveTab('pages')}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '12px 15px', color: activeTab === 'pages' ? 'var(--color-sand)' : 'white', backgroundColor: activeTab === 'pages' ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px', textAlign: 'left' }}
                    >
                        <FileText size={20} /> Page Content
                    </button>

                    <button
                        onClick={() => setActiveTab('projects')}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '12px 15px', color: activeTab === 'projects' ? 'var(--color-sand)' : 'white', backgroundColor: activeTab === 'projects' ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px', textAlign: 'left' }}
                    >
                        <ImageIcon size={20} /> Projects Portfolio
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '12px 15px', color: activeTab === 'settings' ? 'var(--color-sand)' : 'white', backgroundColor: activeTab === 'settings' ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px', textAlign: 'left' }}
                    >
                        <Settings size={20} /> Settings
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '12px 15px', color: '#fca5a5', marginTop: 'auto', textAlign: 'left' }}
                >
                    <LogOut size={20} /> Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', color: 'var(--color-charcoal)' }}>
                            {activeTab === 'dashboard' && 'Welcome back, Admin'}
                            {activeTab === 'pages' && 'Manage Page Content'}
                            {activeTab === 'projects' && 'Manage Projects'}
                            {activeTab === 'settings' && 'Site Settings'}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Today is {new Date().toLocaleDateString()}</p>
                    </div>

                    {activeTab === 'projects' && (
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Plus size={18} /> Add Project
                        </button>
                    )}
                </header>

                {activeTab === 'dashboard' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Projects</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-charcoal)', marginTop: '10px' }}>12</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Page Views (30d)</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-charcoal)', marginTop: '10px' }}>2.4k</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>New Inquiries</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-terracotta)', marginTop: '10px' }}>5</p>
                        </div>
                    </div>
                )}

                {activeTab === 'pages' && (
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ marginBottom: '20px' }}>Home Page Hero Settings</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Tagline</label>
                                <input type="text" defaultValue="Designing Timeless Spaces with a Kenyan Soul." style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Description</label>
                                <textarea defaultValue="Luxury Afro-Modern interiors that blend contemporary global design with authentic Kenyan heritage." rows={4} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                            </div>
                            <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
                        </div>

                        <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                        <h3 style={{ marginBottom: '20px' }}>Images</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            <div style={{ border: '1px solid #e5e7eb', padding: '10px', borderRadius: '6px' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Home Hero Image</p>
                                <div style={{ aspectRatio: '16/9', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                    <img src="/hero.png" alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <button className="btn-outline" style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}>Change Image</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Project Name</th>
                                    <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Category</th>
                                    <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Status</th>
                                    <th style={{ padding: '15px 20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Diani Coastal Villa', cat: 'Boutique Hotel', status: 'Published' },
                                    { name: 'Nairobi Penthouse', cat: 'Residential', status: 'Published' },
                                    { name: 'Muthaiga Escape', cat: 'Airbnb Styling', status: 'Draft' }
                                ].map((proj, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '15px 20px', fontWeight: '500' }}>{proj.name}</td>
                                        <td style={{ padding: '15px 20px', color: 'var(--text-secondary)' }}>{proj.cat}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: proj.status === 'Published' ? '#dcfce7' : '#f3f4f6', color: proj.status === 'Published' ? '#166534' : '#4b5563' }}>
                                                {proj.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <button style={{ color: 'var(--color-terracotta)', fontWeight: '500', fontSize: '0.9rem' }}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
