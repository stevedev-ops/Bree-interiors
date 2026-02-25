import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching project:', error);
                setError('Project could not be found.');
            } else {
                setProject(data);
            }
            setLoading(false);
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>Loading project details...</div>;
    }

    if (error || !project) {
        return (
            <div style={{ paddingTop: '100px', minHeight: '100vh', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--color-charcoal)', marginBottom: '20px' }}>{error || 'Project not found'}</h2>
                    <Link to="/portfolio" style={{ color: 'var(--color-terracotta)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    const allImages = [];
    if (project.image_url) allImages.push(project.image_url);
    if (project.gallery && Array.isArray(project.gallery)) {
        project.gallery.forEach(img => {
            if (img && typeof img === 'string' && img.trim() !== '') {
                allImages.push(img);
            }
        });
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '80px', paddingTop: '100px' }}>
            <div className="container">
                <Link to="/portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '30px', transition: 'color 0.2s ease' }}>
                    <ArrowLeft size={16} /> Back to Portfolio
                </Link>

                <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                        {project.category}
                    </span>
                    <h1 className="heading-xl" style={{ color: 'var(--color-charcoal)', marginBottom: '20px' }}>{project.title}</h1>
                    {project.description && (
                        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            {project.description}
                        </p>
                    )}
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2rem' }}>
                    {allImages.length > 0 ? (
                        allImages.map((img, index) => (
                            <div key={index} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#e0d8d0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <img src={img} alt={`${project.title} - Image ${index + 1}`} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                            </div>
                        ))
                    ) : (
                        <div style={{ width: '100%', padding: '100px 0', backgroundColor: '#e0d8d0', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)' }}>
                            No images available for this project.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
