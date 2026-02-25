import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

const About = () => {
    const pageRef = useScrollReveal();
    const [content, setContent] = useState({
        about_hero_title: 'Crafting Spaces<br />with Soul.',
        about_hero_p1: 'Bree Interiors was founded on a simple philosophy: true luxury is finding harmony between your heritage and your modern lifestyle.',
        about_hero_p2: 'Based in Nairobi, our design studio bridges the gap between contemporary global design trends and authentic Kenyan materiality. We design for the discerning homeowner, the visionary hotelier, and the diaspora client yearning for a piece of authentic home.',
        about_image_url: '/about_studio.png',
        about_quote: '"We believe a home should be a curated collection of what you love, grounded by the earth you stand on."'
    });
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        };
        fetchContent();
    }, []);

    // Helper to safely render HTML line breaks from the database
    const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
        <div ref={pageRef} style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            {/* Hero Section */}
            <section className="section">
                <div className="container grid-2-col">
                    <div className="reveal">
                        <span className="subtitle mb-2">Our Story</span>
                        <h1 className="heading-xl mb-4">{renderHTML(content.about_hero_title)}</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            {content.about_hero_p1}
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            {content.about_hero_p2}
                        </p>
                    </div>
                    <div className="reveal delay-200">
                        <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-sand)', overflow: 'hidden' }}>
                            <img src={content.about_image_url} alt="Bree Interiors Studio Workspace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section bg-secondary text-center">
                <div className="container reveal">
                    <span className="subtitle mb-2">Philosophy</span>
                    <h2 className="heading-lg mb-8" style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        {content.about_quote}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        <div className="reveal delay-100" style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-terracotta)' }}>Culture & Context</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>We draw inspiration from Lamu architecture, Swahili curves, and local artisan crafts, integrating them seamlessly into modern, clean spaces.</p>
                        </div>
                        <div className="reveal delay-200" style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-terracotta)' }}>Natural Tones</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Our palettes reflect the Kenyan landscape—from the red earth of Tsavo to the muted olives of the savannah and the serene sands of Diani.</p>
                        </div>
                        <div className="reveal delay-300" style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-terracotta)' }}>Sustainable Luxury</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Luxury doesn't have to be wasteful. We prioritize locally sourced materials and ethical collaborations with Kenyan craftsmen.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
