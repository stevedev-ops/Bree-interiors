import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const pageRef = useScrollReveal();
    const [content, setContent] = useState({
        hero_tagline: 'Designing Timeless Spaces with a Kenyan Soul.',
        hero_description: 'Luxury Afro-Modern interiors that blend contemporary global design with authentic Kenyan heritage.',
        hero_image_url: '/hero.png',
        home_about_subtitle: 'The Studio',
        home_about_title: 'Where Heritage Meets Modern Luxury.',
        home_about_p1: 'Bree Interiors specializes in high-end residential interiors, boutique hotels, and diaspora dream homes in Kenya. We believe that a space should tell a story—your story, rooted in culture but elevated for modern living.',
        home_about_p2: 'Our signature design approach brings together natural textures, artisan craftsmanship, and refined elegance.',
        home_style_subtitle: 'Signature Style',
        home_style_title: 'Savannah Minimalism™',
        home_style_desc: 'Inspired by the vast serene landscapes of Kenya, this aesthetic balances the warmth of earthy terracotta and sand tones with the clean lines of modern minimalism.',
        home_cta_text: 'Ready to transform your space?'
    });
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Fetch Settings
                const { data: settingsData } = await supabase.from('site_settings').select('key, value');
                if (settingsData) {
                    const newContent = { ...content };
                    settingsData.forEach(setting => {
                        if (Object.keys(newContent).includes(setting.key)) {
                            newContent[setting.key] = setting.value;
                        }
                    });
                    setContent(newContent);
                }

                // Fetch Featured Projects
                const { data: projectsData } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('published', true)
                    .eq('featured', true)
                    .limit(6)
                    .order('created_at', { ascending: false });

                if (projectsData) {
                    setFeaturedProjects(projectsData);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
        <div ref={pageRef}>
            {/* Hero Section */}
            <section
                className="hero"
                style={{
                    height: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1
                }}>
                    <img
                        src={content.hero_image_url}
                        alt="Bree Interiors Hero"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(47, 46, 44, 0.4)'
                    }}></div>
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 1, color: 'var(--color-warm-white)' }}>
                    <span className="subtitle reveal" style={{ color: 'var(--color-sand)', marginBottom: '1.5rem', display: 'block' }}>Bree Interiors</span>
                    <h1 className="reveal delay-100" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', maxWidth: '900px', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        {renderHTML(content.hero_tagline)}
                    </h1>
                    <p className="reveal delay-200" style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', opacity: 0.9 }}>
                        {content.hero_description}
                    </p>
                    <div className="reveal delay-300" style={{ display: 'flex', gap: '20px' }}>
                        <a href="/portfolio" className="btn-primary" style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-charcoal)' }}>View Portfolio</a>
                        <a href="/services" className="btn-outline" style={{ borderColor: 'var(--color-warm-white)', color: 'var(--color-warm-white)' }}>Book a Consultation</a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section bg-secondary">
                <div className="container">
                    <div className="grid-2-col">
                        <div className="reveal">
                            <span className="subtitle" style={{ marginBottom: '1rem' }}>{content.home_about_subtitle}</span>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>{renderHTML(content.home_about_title)}</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                {content.home_about_p1}
                            </p>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                                {content.home_about_p2}
                            </p>
                            <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '500', borderBottom: '1px solid currentColor', paddingBottom: '4px' }}>
                                Discover our story <ArrowRight size={18} />
                            </a>
                        </div>
                        <div className="reveal delay-200" style={{ position: 'relative' }}>
                            <div style={{ aspectRatio: '4/5', backgroundColor: 'var(--color-sand)', overflow: 'hidden' }}>
                                <img src="/about_studio.png" alt="Bree Interiors Studio Workspace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Signature Style Section */}
            <section className="section">
                <div className="container text-center reveal">
                    <span className="subtitle mb-2">{content.home_style_subtitle}</span>
                    <h2 className="heading-lg mb-4">{content.home_style_title}</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        {content.home_style_desc}
                    </p>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section bg-secondary">
                <div className="container">
                    <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <span className="subtitle mb-1">Portfolio</span>
                            <h2 className="heading-lg">Featured Projects</h2>
                        </div>
                        <a href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                            View all work <ArrowRight size={18} />
                        </a>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                        {loading ? (
                            <p style={{ color: 'var(--text-secondary)' }}>Loading portfolio projects...</p>
                        ) : featuredProjects.length > 0 ? (
                            featuredProjects.map((project, index) => (
                                <div key={project.id} className={`reveal delay-${(index % 3) * 100} group`} style={{ cursor: 'pointer' }}>
                                    <div style={{ aspectRatio: '4/3', backgroundColor: '#e0d8d0', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                        {project.image_url ? (
                                            <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-charcoal)' }}></div>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.category}</span>
                                    <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{project.title}</h3>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                                <p style={{ fontSize: '1.1rem' }}>No featured projects yet.</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Go to the Admin Panel → Projects Portfolio, edit a project, and tick <strong>⭐ Feature on Home Page</strong>.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Design Journey */}
            <section className="section">
                <div className="container text-center reveal">
                    <span className="subtitle mb-2">Process</span>
                    <h2 className="heading-lg mb-8">The Design Journey</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'left' }}>
                        {[
                            { step: '01', title: 'Discovery', desc: 'Understanding your vision, lifestyle, and how you want the space to feel.' },
                            { step: '02', title: 'Concept', desc: 'Curating mood boards, color palettes, and spatial layouts.' },
                            { step: '03', title: 'Procurement', desc: 'Sourcing premium materials and custom artisan pieces.' },
                            { step: '04', title: 'Installation', desc: 'The final reveal where design meets reality in perfect harmony.' }
                        ].map((item, index) => (
                            <div key={item.step} className={`reveal delay-${index * 100}`}>
                                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-sand)', marginBottom: '1rem' }}>{item.step}</div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ backgroundColor: 'var(--color-charcoal)', color: 'var(--color-warm-white)', padding: '120px 0', textAlign: 'center' }}>
                <div className="container reveal">
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                        {renderHTML(content.home_cta_text)}
                    </h2>
                    <a href="/services" className="btn-primary" style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-charcoal)', fontSize: '1rem', padding: '18px 40px' }}>
                        Book a Consultation
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
