import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
    { id: 1, title: 'Diani Coastal Villa', category: 'Boutique Hotel', img: '/diani_villa.png', color: '#e0d8d0' },
    { id: 2, title: 'Nairobi Penthouse', category: 'Residential', img: '', color: 'var(--color-charcoal)' },
    { id: 3, title: 'Muthaiga Escape', category: 'Airbnb Styling', img: '', color: 'var(--color-muted-olive)' },
    { id: 4, title: 'Karen Sanctuary', category: 'Residential', img: '', color: 'var(--color-sand)' },
    { id: 5, title: 'Runda Dream Home', category: 'Diaspora', img: '', color: 'var(--color-terracotta)' },
    { id: 6, title: 'Lamu Heritage Hotel', category: 'Commercial', img: '', color: '#e0d8d0' }
];

const Portfolio = () => {
    const pageRef = useScrollReveal();
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Residential', 'Commercial', 'Airbnb Styling', 'Diaspora', 'Boutique Hotel'];

    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <div ref={pageRef} style={{ paddingTop: '80px' }}>
            <section className="section bg-secondary">
                <div className="container text-center reveal">
                    <h1 className="heading-xl mb-4">Portfolio</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        A curated selection of our luxury residential and commercial projects across Kenya.
                    </p>

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
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem', textAlign: 'left' }}>
                        {filteredProjects.map((project, index) => (
                            <div key={`${project.id}-${filter}`} className="animate-fade-in" style={{ animationDelay: `${(index % 3) * 100}ms` }}>
                                <div style={{ aspectRatio: '4/5', backgroundColor: project.color, overflow: 'hidden', marginBottom: '1.5rem', cursor: 'pointer' }}>
                                    {project.img ? (
                                        <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : null}
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.category}</span>
                                <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{project.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
