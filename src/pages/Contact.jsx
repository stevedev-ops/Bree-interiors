import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const pageRef = useScrollReveal();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');
    const [content, setContent] = useState({
        contact_subtitle: 'Get in Touch',
        contact_title: 'Let\'s Create<br />Something Beautiful.',
        contact_desc: 'Whether you have a specific project in mind or just want to explore possibilities, we\'d love to hear from you.',
        contact_address: 'Karen Road, The Hub <br /> Nairobi, Kenya',
        contact_email: 'hello@breeinteriors.co.ke',
        contact_phone: '+254 700 000 000',
        contact_whatsapp: '254700000000'
    });

    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await supabase.from('site_settings').select('key, value');
            if (data) {
                const newContent = { ...content };
                data.forEach(item => {
                    if (Object.keys(newContent).includes(item.key)) {
                        newContent[item.key] = item.value;
                    }
                });
                setContent(newContent);
            }
        };
        fetchContent();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const messageText = `*New Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`;
        const whatsappUrl = `https://wa.me/${content.contact_whatsapp}?text=${encodeURIComponent(messageText)}`;

        window.open(whatsappUrl, '_blank');

        setStatus('Redirecting to WhatsApp...');
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setStatus('');
        }, 3000);
    };

    const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
        <div ref={pageRef} style={{ paddingTop: '80px' }}>
            <section className="section bg-secondary text-center">
                <div className="container reveal">
                    <span className="subtitle mb-2">{content.contact_subtitle}</span>
                    <h1 className="heading-xl mb-4">{renderHTML(content.contact_title)}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        {content.contact_desc}
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="grid-2-col">

                        {/* Contact Info */}
                        <div className="reveal">
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-charcoal)' }}>Contact Information</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.7' }}>
                                We are based in Nairobi but work with clients across Kenya and the diaspora. Reach out to schedule your discovery consultation.
                            </p>

                            <div style={{ marginBottom: '2rem' }}>
                                <span className="subtitle" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>Studio Location</span>
                                <p style={{ fontSize: '1.1rem' }}>{renderHTML(content.contact_address)}</p>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <span className="subtitle" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>Email Us</span>
                                <p style={{ fontSize: '1.1rem' }}>
                                    <a href={`mailto:${content.contact_email}`} style={{ color: 'inherit' }}>{content.contact_email}</a>
                                </p>
                            </div>

                            <div style={{ marginBottom: '3rem' }}>
                                <span className="subtitle" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>Call Us</span>
                                <p style={{ fontSize: '1.1rem' }}>{content.contact_phone}</p>
                            </div>

                            <div>
                                <a href={`https://wa.me/${content.contact_whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ backgroundColor: '#25D366', color: 'white', border: 'none' }}>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="reveal delay-200" style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Send an Inquiry</h3>

                            {status && (
                                <div style={{ padding: '15px', backgroundColor: status.includes('success') ? '#dcfce7' : '#f3f4f6', color: status.includes('success') ? '#166534' : '#4b5563', marginBottom: '20px', borderRadius: '4px' }}>
                                    {status}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #dcd5cc', background: 'transparent', fontFamily: 'var(--font-body)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #dcd5cc', background: 'transparent', fontFamily: 'var(--font-body)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subject / Project Type</label>
                                    <select name="subject" value={formData.subject} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #dcd5cc', background: 'transparent', fontFamily: 'var(--font-body)' }}>
                                        <option value="" disabled>Select an option</option>
                                        <option value="Residential">Residential Design</option>
                                        <option value="Commercial">Commercial Design</option>
                                        <option value="Airbnb">Airbnb Styling</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message (Budget, Timeline, etc.)</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} style={{ width: '100%', padding: '12px', border: '1px solid #dcd5cc', background: 'transparent', fontFamily: 'var(--font-body)' }}></textarea>
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
