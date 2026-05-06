import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, Plus, PenTool } from 'lucide-react';
import BlogManager from './BlogManager';

const PageContentEditor = () => {
    const [content, setContent] = useState({
        hero_tagline: 'Designing Timeless Spaces with a Kenyan Soul.',
        hero_description: 'Luxury Afro-Modern interiors that blend contemporary global design with authentic Kenyan heritage.',
        hero_image_url: '/hero.png',
        home_about_subtitle: 'The Studio',
        home_about_title: 'Where Heritage Meets Modern Luxury.',
        home_about_p1: 'Bree Interiors specializes in high-end residential interiors, boutique hotels, and diaspora dream homes in Kenya.',
        home_about_p2: 'Our signature design approach brings together natural textures, artisan craftsmanship, and refined elegance.',
        home_style_subtitle: 'Signature Style',
        home_style_title: 'Savannah Minimalism™',
        home_style_desc: 'Inspired by the vast serene landscapes of Kenya, this aesthetic balances the warmth of earthy terracotta and sand tones with the clean lines of modern minimalism.',
        home_cta_text: 'Ready to transform your space?'
    });
    const [status, setStatus] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/settings/');
                const data = response.data;
                if (data) {
                    const newContent = { ...content };
                    data.forEach(item => {
                        if (Object.keys(newContent).includes(item.key)) {
                            newContent[item.key] = item.value;
                        }
                    });
                    setContent(newContent);
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            }
        };
        fetchContent();
    }, []);

    const handleSaveText = async () => {
        setStatus('Saving text...');
        try {
            const updates = Object.entries(content)
                .filter(([key]) => key !== 'hero_image_url')
                .map(([key, value]) => ({ key, value }));
            await api.post('/settings/bulk_update/', updates);
            setStatus('Text saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (event) => {
        try {
            setUploading(true);
            setStatus('Uploading image...');

            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await api.post('/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imageUrl = uploadRes.data.url;

            await api.post('/settings/bulk_update/', [
                { key: 'hero_image_url', value: imageUrl }
            ]);

            setContent({ ...content, hero_image_url: imageUrl });
            setStatus('Image uploaded and saved successfully!');
            setTimeout(() => setStatus(''), 3000);

        } catch (error) {
            setStatus(`Upload failed: ${error.message || 'Unknown error. Check console for details.'}`);
            console.error('Image upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ marginBottom: '20px' }}>Home Page Settings</h3>
            {status && <div style={{ padding: '10px', backgroundColor: '#f0f9ff', color: '#0369a1', marginBottom: '15px' }}>{status}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ color: 'var(--color-charcoal)' }}>Hero Section</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Tagline</label>
                        <input type="text" name="hero_tagline" value={content.hero_tagline} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Description</label>
                        <textarea name="hero_description" value={content.hero_description} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>

                    <h4 style={{ color: 'var(--color-charcoal)', marginTop: '20px' }}>Signature Style Section</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subtitle</label>
                        <input type="text" name="home_style_subtitle" value={content.home_style_subtitle} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title</label>
                        <input type="text" name="home_style_title" value={content.home_style_title} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Description</label>
                        <textarea name="home_style_desc" value={content.home_style_desc} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ color: 'var(--color-charcoal)' }}>About The Studio Section</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subtitle</label>
                        <input type="text" name="home_about_subtitle" value={content.home_about_subtitle} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title</label>
                        <input type="text" name="home_about_title" value={content.home_about_title} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Paragraph 1</label>
                        <textarea name="home_about_p1" value={content.home_about_p1} onChange={handleChange} rows={2} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Paragraph 2</label>
                        <textarea name="home_about_p2" value={content.home_about_p2} onChange={handleChange} rows={2} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>

                    <h4 style={{ color: 'var(--color-charcoal)', marginTop: '20px' }}>CTA Section</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Call To Action Text</label>
                        <input type="text" name="home_cta_text" value={content.home_cta_text} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                </div>
            </div>

            <button onClick={handleSaveText} className="btn-primary" style={{ marginTop: '20px' }}>Save Home Text</button>

            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

            <h3 style={{ marginBottom: '20px' }}>Imagery</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ border: '1px solid #e5e7eb', padding: '15px', borderRadius: '6px' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '10px', fontWeight: '500' }}>Home Hero Image</p>
                    <div style={{ aspectRatio: '16/9', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                        <img src={content.hero_image_url} alt="Hero Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {uploading && (
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Uploading...
                            </div>
                        )}
                    </div>

                    <label className="btn-outline" style={{ display: 'block', textAlign: 'center', cursor: 'pointer', opacity: uploading ? 0.5 : 1, marginBottom: '10px' }}>
                        {uploading ? 'Processing...' : 'Upload New Image'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            style={{ display: 'none' }}
                        />
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR Link:</span>
                        <input
                            type="text"
                            value={content.hero_image_url || ''}
                            onChange={(e) => setContent({ ...content, hero_image_url: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            style={{ flex: 1, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.85rem' }}
                        />
                    </div>

                    {content.hero_image_url && content.hero_image_url !== '/hero.png' && (
                        <button
                            onClick={async () => {
                                try {
                                    await api.post('/settings/bulk_update/', [{ key: 'hero_image_url', value: '/hero.png' }]);
                                    setContent({ ...content, hero_image_url: '/hero.png' });
                                    setStatus('Image removed. Default restored.');
                                    setTimeout(() => setStatus(''), 3000);
                                } catch (e) {
                                    setStatus('Error resetting image');
                                }
                            }}
                            style={{ width: '100%', padding: '10px', border: '1px solid #fca5a5', color: '#ef4444', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '0.9rem' }}
                        >
                            Remove Image (Restore Default)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const AboutPageEditor = () => {
    const [title, setTitle] = useState('Crafted with Purpose. Rooted in Culture.');
    const [p1, setP1] = useState('Bree Interiors was founded on a simple belief: that great design tells a story. Our studio combines global design sensibilities with the rich heritage of Kenyan craftsmanship.');
    const [p2, setP2] = useState('We work with a curated network of local artisans, furniture makers, and material suppliers to deliver spaces that are as unique as our clients.');
    const [quote, setQuote] = useState('"Design is not just what it looks like. Design is how it works."');
    const [image, setImage] = useState('/about_studio.png');
    const [status, setStatus] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/settings/');
                const data = response.data;
                if (data) {
                    data.forEach(item => {
                        if (item.key === 'about_hero_title') setTitle(item.value);
                        if (item.key === 'about_hero_p1') setP1(item.value);
                        if (item.key === 'about_hero_p2') setP2(item.value);
                        if (item.key === 'about_quote') setQuote(item.value);
                        if (item.key === 'about_image_url') setImage(item.value);
                    });
                }
            } catch (err) {
                console.error('Error fetching about settings:', err);
            }
        };
        fetchContent();
    }, []);

    const handleSaveText = async () => {
        setStatus('Saving text...');
        try {
            await api.post('/settings/bulk_update/', [
                { key: 'about_hero_title', value: title },
                { key: 'about_hero_p1', value: p1 },
                { key: 'about_hero_p2', value: p2 },
                { key: 'about_quote', value: quote }
            ]);
            setStatus('Text saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    const handleImageUpload = async (event) => {
        try {
            setUploading(true);
            setStatus('Uploading image...');

            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await api.post('/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imageUrl = uploadRes.data.url;

            await api.post('/settings/bulk_update/', [
                { key: 'about_image_url', value: imageUrl }
            ]);

            setImage(imageUrl);
            setStatus('Image uploaded and saved successfully!');
            setTimeout(() => setStatus(''), 3000);

        } catch (error) {
            setStatus(`Upload failed: ${error.message || 'Unknown error.'}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>About Page Settings</h3>
            {status && <div style={{ padding: '10px', backgroundColor: '#f0f9ff', color: '#0369a1', marginBottom: '15px' }}>{status}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Paragraph 1</label>
                    <textarea value={p1} onChange={e => setP1(e.target.value)} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Paragraph 2</label>
                    <textarea value={p2} onChange={e => setP2(e.target.value)} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Philosophy Quote</label>
                    <input type="text" value={quote} onChange={e => setQuote(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <button onClick={handleSaveText} className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Text</button>
            </div>

            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

            <h3 style={{ marginBottom: '20px' }}>Imagery</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ border: '1px solid #e5e7eb', padding: '15px', borderRadius: '6px' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '10px', fontWeight: '500' }}>About Studio Image</p>
                    <div style={{ aspectRatio: '3/4', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                        <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {uploading && (
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Uploading...
                            </div>
                        )}
                    </div>
                    <label className="btn-outline" style={{ display: 'block', textAlign: 'center', cursor: 'pointer', opacity: uploading ? 0.5 : 1, marginBottom: '10px' }}>
                        {uploading ? 'Processing...' : 'Upload New Image'}
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ display: 'none' }} />
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR Link:</span>
                        <input
                            type="text"
                            value={image || ''}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            style={{ flex: 1, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.85rem' }}
                        />
                    </div>

                    {image && image !== '/about_studio.png' && (
                        <button
                            onClick={async () => {
                                try {
                                    await api.post('/settings/bulk_update/', [{ key: 'about_image_url', value: '/about_studio.png' }]);
                                    setImage('/about_studio.png');
                                    setStatus('Image removed. Default restored.');
                                    setTimeout(() => setStatus(''), 3000);
                                } catch (e) {
                                    setStatus('Error resetting image');
                                }
                            }}
                            style={{ width: '100%', padding: '10px', border: '1px solid #fca5a5', color: '#ef4444', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '0.9rem' }}
                        >
                            Remove Image (Restore Default)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const ServicesPageEditor = () => {
    const [title, setTitle] = useState('Premium Design Services.');
    const [subtitle, setSubtitle] = useState('From concept to completion, we offer a full suite of interior design services tailored to the discerning Kenyan homeowner.');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/settings/');
                const data = response.data;
                if (data) {
                    data.forEach(item => {
                        if (item.key === 'services_title') setTitle(item.value);
                        if (item.key === 'services_subtitle') setSubtitle(item.value);
                    });
                }
            } catch (err) {
                console.error('Error fetching services settings:', err);
            }
        };
        fetchContent();
    }, []);

    const handleSaveText = async () => {
        setStatus('Saving text...');
        try {
            await api.post('/settings/bulk_update/', [
                { key: 'services_title', value: title },
                { key: 'services_subtitle', value: subtitle }
            ]);
            setStatus('Text saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Services Page Settings</h3>
            {status && <div style={{ padding: '10px', backgroundColor: '#f0f9ff', color: '#0369a1', marginBottom: '15px' }}>{status}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Subtitle</label>
                    <textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <button onClick={handleSaveText} className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Text</button>
            </div>
        </div>
    );
};

const SustainabilityPageEditor = () => {
    const [title, setTitle] = useState('Designing for a Better Tomorrow.');
    const [subtitle, setSubtitle] = useState('We believe beautiful design and environmental responsibility go hand in hand. Our commitment to sustainability shapes every project.');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/settings/');
                const data = response.data;
                if (data) {
                    data.forEach(item => {
                        if (item.key === 'sustainability_title') setTitle(item.value);
                        if (item.key === 'sustainability_subtitle') setSubtitle(item.value);
                    });
                }
            } catch (err) {
                console.error('Error fetching sustainability settings:', err);
            }
        };
        fetchContent();
    }, []);

    const handleSaveText = async () => {
        setStatus('Saving text...');
        try {
            await api.post('/settings/bulk_update/', [
                { key: 'sustainability_title', value: title },
                { key: 'sustainability_subtitle', value: subtitle }
            ]);
            setStatus('Text saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Sustainability Page Settings</h3>
            {status && <div style={{ padding: '10px', backgroundColor: '#f0f9ff', color: '#0369a1', marginBottom: '15px' }}>{status}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Subtitle</label>
                    <textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                </div>
                <button onClick={handleSaveText} className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Text</button>
            </div>
        </div>
    );
};

const DesignJourneyPageEditor = () => {
    const [content, setContent] = useState({
        journey_subtitle: 'Process',
        journey_title: 'The Design Journey',
        journey_desc: 'A seamless, premium, and highly organized experience from the first sketch to the final reveal.'
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/settings/');
                const data = response.data;
                if (data) {
                    const newContent = { ...content };
                    data.forEach(item => {
                        if (Object.keys(newContent).includes(item.key)) {
                            newContent[item.key] = item.value;
                        }
                    });
                    setContent(newContent);
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            }
        };
        fetchContent();
    }, []);

    const handleSaveText = async () => {
        setStatus('Saving text...');
        try {
            const updates = Object.entries(content).map(([key, value]) => ({ key, value }));
            await api.post('/settings/bulk_update/', updates);
            setStatus('Text saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Design Journey Page Settings</h3>
            {status && <div style={{ padding: '10px', backgroundColor: '#f0f9ff', color: '#0369a1', marginBottom: '15px' }}>{status}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Subtitle</label>
                    <input type="text" name="journey_subtitle" value={content.journey_subtitle} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Title</label>
                    <input type="text" name="journey_title" value={content.journey_title} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Description</label>
                    <textarea name="journey_desc" value={content.journey_desc} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                </div>
                <button onClick={handleSaveText} className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Text</button>
            </div>
        </div>
    );
};

const ContactPageEditor = () => {
    const [content, setContent] = useState({
        contact_subtitle: 'Get in Touch',
        contact_title: 'Let\'s Create<br />Something Beautiful.',
        contact_desc: 'Whether you have a specific project in mind or just want to explore possibilities, we\'d love to hear from you.',
        contact_address: 'Karen Road, The Hub <br /> Nairobi, Kenya',
        contact_email: 'hello@breeinteriors.co.ke',
        contact_phone: '+254 700 000 000',
        contact_whatsapp: '254700000000'
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await api.get('/settings/');
                const data = response.data;
                if (data) {
                    const newContent = { ...content };
                    data.forEach(item => {
                        if (Object.keys(newContent).includes(item.key)) {
                            newContent[item.key] = item.value;
                        }
                    });
                    setContent(newContent);
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            }
        };
        fetchContent();
    }, []);

    const handleSaveText = async () => {
        setStatus('Saving text...');
        try {
            const updates = Object.entries(content).map(([key, value]) => ({ key, value }));
            await api.post('/settings/bulk_update/', updates);
            setStatus('Text saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } catch (e) {
            setStatus('Error saving');
        }
    };

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginTop: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Contact & Company Details</h3>
            {status && <div style={{ padding: '10px', backgroundColor: '#f0f9ff', color: '#0369a1', marginBottom: '15px' }}>{status}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ color: 'var(--color-charcoal)' }}>Page Header</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Subtitle</label>
                        <input type="text" name="contact_subtitle" value={content.contact_subtitle} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Title</label>
                        <input type="text" name="contact_title" value={content.contact_title} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hero Description</label>
                        <textarea name="contact_desc" value={content.contact_desc} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h4 style={{ color: 'var(--color-charcoal)' }}>Company Information</h4>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Physical Address</label>
                        <input type="text" name="contact_address" value={content.contact_address} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input type="email" name="contact_email" value={content.contact_email} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                        <input type="text" name="contact_phone" value={content.contact_phone} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>WhatsApp Number (Format: 254700000000)</label>
                        <input type="text" name="contact_whatsapp" value={content.contact_whatsapp} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                    </div>
                </div>
            </div>
            <button onClick={handleSaveText} className="btn-primary" style={{ marginTop: '20px' }}>Save Details</button>
        </div>
    );
};

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editProject, setEditProject] = useState(null);
    const [newProject, setNewProject] = useState({ title: '', category: '', image_url: '', description: '', gallery: [], published: true, featured: false });
    const [uploading, setUploading] = useState(false);
    const [editUploading, setEditUploading] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [editStatus, setEditStatus] = useState('');

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await api.get('/projects/');
            if (response.data) setProjects(response.data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
        setLoading(false);
    };

    const deleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}/`);
                fetchProjects();
            } catch (err) {
                alert('Error deleting project');
            }
        }
    };

    const startEdit = (proj) => { setEditingId(proj.id); setEditProject({ ...proj }); setEditStatus(''); };
    const cancelEdit = () => { setEditingId(null); setEditProject(null); setEditStatus(''); };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/projects/${editProject.id}/`, {
                title: editProject.title,
                category: editProject.category,
                description: editProject.description || '',
                image_url: editProject.image_url,
                gallery: editProject.gallery || [],
                published: editProject.published,
                featured: editProject.featured || false
            });
            cancelEdit();
            fetchProjects();
        } catch (error) {
            setEditStatus(`Error: ${error.response?.data?.detail || error.message}`);
        }
    };

    const handleImageUpload = async (event, isEdit) => {
        const file = event.target.files[0];
        if (!file) return;
        const setUploadingFn = isEdit ? setEditUploading : setUploading;
        const setStatusFn = isEdit ? setEditStatus : setFormStatus;
        try {
            setUploadingFn(true);
            setStatusFn('Uploading image...');
            
            const formData = new FormData();
            formData.append('file', file);
            
            const uploadRes = await api.post('/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const imageUrl = uploadRes.data.url;
            
            if (isEdit) {
                setEditProject(prev => ({ ...prev, image_url: imageUrl }));
            } else {
                setNewProject(prev => ({ ...prev, image_url: imageUrl }));
            }
            setStatusFn('Image ready. Click Save to confirm.');
        } catch (err) {
            setStatusFn(`Error: ${err.message}`);
        } finally {
            setUploadingFn(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects/', newProject);
            setIsAdding(false);
            setNewProject({ title: '', category: '', image_url: '', description: '', gallery: [], published: true, featured: false });
            setFormStatus('');
            fetchProjects();
        } catch (error) {
            const msg = `Error saving project: ${error.response?.data?.detail || error.message}`;
            setFormStatus(msg);
            window.alert(msg);
        }
    };

    const imgInput = (imageUrl, onChangeFile, onChangeUrl, up, remove) => (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {imageUrl && (
                <div style={{ width: '100px', height: '75px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'block', padding: '10px', border: '2px dashed #e5e7eb', borderRadius: '6px', textAlign: 'center', cursor: up ? 'not-allowed' : 'pointer', backgroundColor: '#f9fafb', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {up ? 'Uploading...' : 'Upload Image File'}
                    <input type="file" accept="image/*" onChange={onChangeFile} disabled={up} style={{ display: 'none' }} />
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR Link:</span>
                    <input
                        type="text"
                        value={imageUrl || ''}
                        onChange={onChangeUrl}
                        placeholder="https://example.com/image.jpg"
                        style={{ flex: 1, padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.85rem' }}
                    />
                </div>

                {imageUrl && <button type="button" onClick={remove} style={{ fontSize: '0.8rem', color: '#ef4444', background: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}>Remove Image</button>}
            </div>
        </div>
    );

    const categorySelect = (val, onChange) => (
        <select required value={val} onChange={onChange} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
            <option value="" disabled>Select Category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Boutique Hotel">Boutique Hotel</option>
            <option value="Airbnb Styling">Airbnb Styling</option>
        </select>
    );

    if (loading) return <p>Loading projects...</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button onClick={() => { setIsAdding(!isAdding); setFormStatus(''); setEditingId(null); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Project'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleCreate} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3>Create New Project</h3>
                    {formStatus && <div style={{ padding: '10px', backgroundColor: formStatus.includes('Error') || formStatus.includes('failed') ? '#fef2f2' : '#f0f9ff', color: formStatus.includes('Error') || formStatus.includes('failed') ? '#dc2626' : '#0369a1', borderRadius: '6px' }}>{formStatus}</div>}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title *</label>
                            <input type="text" required value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category *</label>
                            {categorySelect(newProject.category, e => setNewProject({ ...newProject, category: e.target.value }))}
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Short Description (Optional)</label>
                        <textarea rows={3} value={newProject.description || ''} onChange={e => setNewProject({ ...newProject, description: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Primary Image *</label>
                        {imgInput(
                            newProject.image_url,
                            (e) => handleImageUpload(e, false),
                            (e) => setNewProject({ ...newProject, image_url: e.target.value }),
                            uploading,
                            () => setNewProject({ ...newProject, image_url: '' })
                        )}
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Additional Gallery Images (Up to 4)</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[0, 1, 2, 3].map(index => (
                                <div key={`new-gal-${index}`} style={{ padding: '10px', border: '1px solid #f3f4f6', borderRadius: '6px' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Gallery Image {index + 1}</span>
                                    {imgInput(
                                        newProject.gallery?.[index] || '',
                                        async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            setUploading(true); setFormStatus('Uploading gallery image...');
                                            
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            
                                            try {
                                                const response = await api.post('/upload/', formData, {
                                                    headers: { 'Content-Type': 'multipart/form-data' }
                                                });
                                                const newGal = [...(newProject.gallery || [])];
                                                newGal[index] = response.data.url;
                                                setNewProject({ ...newProject, gallery: newGal });
                                                setFormStatus('Gallery image ready.');
                                            } catch (err) {
                                                setFormStatus(`Upload failed: ${err.message}`);
                                            }
                                            setUploading(false);
                                        },
                                        (e) => {
                                            const newGal = [...(newProject.gallery || [])];
                                            newGal[index] = e.target.value;
                                            setNewProject({ ...newProject, gallery: newGal });
                                        },
                                        uploading,
                                        () => {
                                            const newGal = [...(newProject.gallery || [])];
                                            newGal[index] = '';
                                            setNewProject({ ...newProject, gallery: newGal });
                                        }
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" id="new-published" checked={newProject.published} onChange={e => setNewProject({ ...newProject, published: e.target.checked })} />
                            <label htmlFor="new-published">Publish immediately</label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" id="new-featured" checked={newProject.featured || false} onChange={e => setNewProject({ ...newProject, featured: e.target.checked })} />
                            <label htmlFor="new-featured">⭐ Feature on Home Page</label>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={uploading}>Save Project</button>
                </form>
            )}

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
                        {projects.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No projects found. Add one to get started.</td></tr>
                        ) : (
                            projects.map((proj) => (
                                <React.Fragment key={proj.id}>
                                    <tr style={{ borderBottom: editingId === proj.id ? 'none' : '1px solid #e5e7eb', backgroundColor: editingId === proj.id ? '#fffbf0' : 'white' }}>
                                        <td style={{ padding: '15px 20px', fontWeight: '500' }}>{proj.title}</td>
                                        <td style={{ padding: '15px 20px', color: 'var(--text-secondary)' }}>{proj.category}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: proj.published ? '#dcfce7' : '#f3f4f6', color: proj.published ? '#166534' : '#4b5563' }}>
                                                {proj.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 20px', display: 'flex', gap: '12px' }}>
                                            <button onClick={() => editingId === proj.id ? cancelEdit() : startEdit(proj)} style={{ color: editingId === proj.id ? '#6b7280' : 'var(--color-terracotta)', fontWeight: '500', fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                                                {editingId === proj.id ? 'Cancel' : 'Edit'}
                                            </button>
                                            <button onClick={() => deleteProject(proj.id)} style={{ color: '#ef4444', fontWeight: '500', fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>Delete</button>
                                        </td>
                                    </tr>
                                    {editingId === proj.id && editProject && (
                                        <tr style={{ borderBottom: '2px solid var(--color-terracotta)' }}>
                                            <td colSpan="4" style={{ padding: '25px', backgroundColor: '#fffbf0' }}>
                                                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                    <h4 style={{ color: 'var(--color-charcoal)', marginBottom: '5px' }}>Editing: {proj.title}</h4>
                                                    {editStatus && <div style={{ padding: '10px', backgroundColor: editStatus.includes('Error') ? '#fef2f2' : '#f0f9ff', color: editStatus.includes('Error') ? '#dc2626' : '#0369a1', borderRadius: '6px' }}>{editStatus}</div>}
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title</label>
                                                            <input type="text" required value={editProject.title} onChange={e => setEditProject({ ...editProject, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                                                            {categorySelect(editProject.category, e => setEditProject({ ...editProject, category: e.target.value }))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Short Description (Optional)</label>
                                                        <textarea rows={3} value={editProject.description || ''} onChange={e => setEditProject({ ...editProject, description: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'var(--font-body)' }} />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Primary Image *</label>
                                                        {imgInput(
                                                            editProject.image_url,
                                                            (e) => handleImageUpload(e, true),
                                                            (e) => setEditProject({ ...editProject, image_url: e.target.value }),
                                                            editUploading,
                                                            () => setEditProject({ ...editProject, image_url: '' })
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Additional Gallery Images (Up to 4)</label>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            {[0, 1, 2, 3].map(index => (
                                                                <div key={`edit-gal-${index}`} style={{ padding: '10px', border: '1px solid #f3f4f6', borderRadius: '6px' }}>
                                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Gallery Image {index + 1}</span>
                                                                    {imgInput(
                                                                        editProject.gallery?.[index] || '',
                                                                        async (e) => {
                                                                            const file = e.target.files[0];
                                                                            if (!file) return;
                                                                            setEditUploading(true); setEditStatus('Uploading gallery image...');
                                                                            
                                                                            const formData = new FormData();
                                                                            formData.append('file', file);
                                                                            
                                                                            try {
                                                                                const response = await api.post('/upload/', formData, {
                                                                                    headers: { 'Content-Type': 'multipart/form-data' }
                                                                                });
                                                                                const newGal = [...(editProject.gallery || [])];
                                                                                newGal[index] = response.data.url;
                                                                                setEditProject({ ...editProject, gallery: newGal });
                                                                                setEditStatus('Gallery image ready.');
                                                                            } catch (err) {
                                                                                setEditStatus(`Upload failed: ${err.message}`);
                                                                            }
                                                                            setEditUploading(false);
                                                                        },
                                                                        (e) => {
                                                                            const newGal = [...(editProject.gallery || [])];
                                                                            newGal[index] = e.target.value;
                                                                            setEditProject({ ...editProject, gallery: newGal });
                                                                        },
                                                                        editUploading,
                                                                        () => {
                                                                            const newGal = [...(editProject.gallery || [])];
                                                                            newGal[index] = '';
                                                                            setEditProject({ ...editProject, gallery: newGal });
                                                                        }
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <input type="checkbox" id={`edit-pub-${proj.id}`} checked={editProject.published} onChange={e => setEditProject({ ...editProject, published: e.target.checked })} />
                                                            <label htmlFor={`edit-pub-${proj.id}`}>Published</label>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <input type="checkbox" id={`edit-feat-${proj.id}`} checked={editProject.featured || false} onChange={e => setEditProject({ ...editProject, featured: e.target.checked })} />
                                                            <label htmlFor={`edit-feat-${proj.id}`}>⭐ Feature on Home Page</label>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <button type="submit" className="btn-primary" disabled={editUploading}>Save Changes</button>
                                                        <button type="button" onClick={cancelEdit} style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', background: 'white' }}>Cancel</button>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [projectCount, setProjectCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            try {
                // Fetch dynamic stats for dashboard
                const [projRes, blogRes] = await Promise.all([
                    api.get('/projects/'),
                    api.get('/blogs/')
                ]);

                if (projRes.data) setProjectCount(projRes.data.length);
                if (blogRes.data) setBlogCount(blogRes.data.length);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                if (err.response && err.response.status === 401) {
                    navigate('/admin/login');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
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
                        onClick={() => setActiveTab('blog')}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '100%', padding: '12px 15px', color: activeTab === 'blog' ? 'var(--color-sand)' : 'white', backgroundColor: activeTab === 'blog' ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: '8px', textAlign: 'left' }}
                    >
                        <PenTool size={20} /> Blog Posts
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
                            {activeTab === 'blog' && 'Manage Blog Posts'}
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
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-charcoal)', marginTop: '10px' }}>{projectCount}</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Blog Posts</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-terracotta)', marginTop: '10px' }}>{blogCount}</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Page Views (Demo)</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-charcoal)', marginTop: '10px' }}>2.4k</p>
                        </div>
                    </div>
                )}

                {activeTab === 'pages' && (
                    <>
                        <PageContentEditor />
                        <AboutPageEditor />
                        <ServicesPageEditor />
                        <SustainabilityPageEditor />
                        <DesignJourneyPageEditor />
                        <ContactPageEditor />
                    </>
                )}

                {activeTab === 'projects' && (
                    <ProjectsManager />
                )}

                {activeTab === 'blog' && (
                    <BlogManager />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
