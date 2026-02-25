import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

const Portfolio = () => {
    const pageRef = useScrollReveal();
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (data) {
                setProjects(data);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const categories = ['All', '⭐ Featured', 'Residential', 'Commercial', 'Boutique Hotel', 'Airbnb Styling', 'Diaspora'];

    const filteredProjects = filter === 'All'
        ? projects
        : filter === '⭐ Featured'
            ? projects.filter(p => p.featured === true)
            : projects.filter(p => p.category === filter);

    return (
        <div ref={pageRef} style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <section className="section bg-secondary text-center">
                <div className="container reveal">
                    <span className="subtitle mb-2">Our Work</span>
                    <h1 className="heading-xl mb-4">Curated Spaces.</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Explore a selection of our finest luxury Afro-Modern interiors across Kenya.
                    </p>

                    {/* Filter Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '20px',
                                    border: `1px solid ${filter === cat ? 'var(--color-charcoal)' : '#ccc'}`,
                                    backgroundColor: filter === cat ? 'var(--color-charcoal)' : 'transparent',
                                    color: filter === cat ? 'var(--color-warm-white)' : 'var(--text-primary)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem', textAlign: 'left' }}>
                        {loading ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
                                Loading portfolio...
                            </div>
                        ) : filteredProjects.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
                                {filter === '⭐ Featured'
                                    ? 'No featured projects yet. Mark a project as featured in the admin panel.'
                                    : 'No published projects found in this category.'}
                            </div>
                        ) : (
                            filteredProjects.map((project, index) => (
                                <div key={`${project.id}-${filter}`} className="animate-fade-in" style={{ animationDelay: `${(index % 3) * 100}ms` }}>
                                    <div style={{ position: 'relative', aspectRatio: '4/5', backgroundColor: '#e0d8d0', overflow: 'hidden', marginBottom: '1.5rem', cursor: 'pointer' }}>
                                        {project.image_url ? (
                                            <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-charcoal)' }}></div>
                                        )}
                                        {project.featured && (
                                            <div style={{
                                                position: 'absolute', top: '12px', left: '12px',
                                                backgroundColor: 'var(--color-terracotta)', color: 'white',
                                                padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem',
                                                fontWeight: '600', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px'
                                            }}>
                                                ⭐ Featured
                                            </div>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.category}</span>
                                    <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{project.title}</h3>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
