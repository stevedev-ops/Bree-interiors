import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import Masonry from 'react-masonry-css';

const Portfolio = () => {
    const pageRef = useScrollReveal();
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);

    // Category descriptions for dynamic text
    const categoryDescriptions = {
        'All': 'Explore a curated selection of our finest luxury Afro-Modern interiors across Kenya. We blend contemporary design with deep-rooted cultural aesthetics.',
        'Residential': 'Creating private sanctuaries that reflect your personal journey. Our residential spaces are designed for intimate luxury and everyday comfort.',
        'Commercial': 'Elevating brand experiences through strategic spatial design. We create functional, inspiring environments that leave a lasting impression.',
        'Boutique Hotel': 'Crafting unforgettable guest experiences through localized, immersive design. Every space tells a story of heritage and premium hospitality.',
        'Airbnb Styling': 'Maximizing appeal and booking potential through curated, photogenic interiors that stand out in the competitive short-term rental market.',
        'Diaspora': 'Bridging the gap for Kenyans abroad. We provide seamless, end-to-end interior design and project management for your investment back home.'
    };

    const categories = ['All', 'Residential', 'Commercial', 'Boutique Hotel', 'Airbnb Styling', 'Diaspora'];

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

    const handleFilterChange = (cat) => {
        setFilter(cat);
        setVisibleCount(6); // Reset visible count on filter change
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const hasMore = visibleProjects.length < filteredProjects.length;

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <PageTransition>
            <SEO
                title="Portfolio | Bree Interiors"
                description="Explore our curated portfolio of luxury Afro-Modern interiors across residential and commercial spaces in Kenya."
            />
            <div ref={pageRef} style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
                <section className="text-center">
                    <div className="container reveal">
                        <span className="subtitle mb-2">Our Work</span>
                        <h1 className="heading-xl mb-4">Curated Spaces.</h1>

                        <div style={{ minHeight: '80px', marginBottom: '3rem' }}>
                            <p
                                key={filter} // Forces a re-render/re-animation when filter changes
                                className="animate-fade-in"
                                style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}
                            >
                                {categoryDescriptions[filter]}
                            </p>
                        </div>

                        {/* Filter Text Links */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleFilterChange(cat)}
                                    className={`filter-link ${filter === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Projects Masonry Grid */}
                        <div style={{ textAlign: 'left' }}>
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
                                    Loading portfolio...
                                </div>
                            ) : filteredProjects.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
                                    No published projects found in this category.
                                </div>
                            ) : (
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column"
                                >
                                    {visibleProjects.map((project, index) => (
                                        <Link
                                            to={`/portfolio/${project.id}`}
                                            key={`${project.id}-${filter}`}
                                            className="animate-fade-in"
                                            style={{ textDecoration: 'none', color: 'inherit', animationDelay: `${(index % 3) * 100}ms`, display: 'block', marginBottom: '2rem' }}
                                        >
                                            <div className="portfolio-card" style={{ marginBottom: '1.2rem', backgroundColor: '#e0d8d0' }}>
                                                {project.image_url ? (
                                                    <ImageWithSkeleton src={project.image_url} alt={project.title} style={{ width: '100%', display: 'block' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--color-charcoal)' }}></div>
                                                )}
                                                <div className="portfolio-overlay">
                                                    <span className="portfolio-overlay-text">View Project</span>
                                                </div>
                                            </div>
                                            <div style={{ paddingLeft: '4px' }}>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}>{project.category}</span>
                                                <h3 style={{ fontSize: '1.4rem', marginTop: '0.3rem', fontWeight: '400' }}>{project.title}</h3>
                                            </div>
                                        </Link>
                                    ))}
                                </Masonry>
                            )}
                        </div>

                        {/* Load More Button */}
                        {!loading && hasMore && (
                            <div style={{ marginTop: '3rem' }}>
                                <button onClick={loadMore} className="btn-outline">
                                    Load More Projects
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Portfolio;
