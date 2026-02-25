import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching blog post:", error);
                setError("Post not found or could not be loaded.");
            } else if (data) {
                setPost(data);
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--color-warm-white)' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Loading article...</p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div style={{ paddingTop: '100px', minHeight: '100vh', textAlign: 'center', backgroundColor: 'var(--color-warm-white)' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--color-charcoal)', marginBottom: '20px' }}>{error || "Post not found"}</h2>
                    <Link to="/blog" style={{ color: 'var(--color-terracotta)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <PageTransition>
            <SEO
                title={`${post.title} | Bree Interiors`}
                description={post.excerpt || `Read our latest article on ${post.title}.`}
                image={post.image_url}
            />
            <div style={{ backgroundColor: 'var(--color-warm-white)', minHeight: '100vh', paddingBottom: '60px' }}>
                {/* Header Hero */}
                <header style={{
                    paddingTop: '80px',
                    backgroundColor: 'var(--color-charcoal)',
                    color: 'white',
                    minHeight: '40vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2, padding: '60px 0' }}>
                        <Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '20px', fontSize: '0.9rem', transition: 'color 0.2s ease' }}>
                            <ArrowLeft size={16} /> Back to Blog
                        </Link>
                        <h1 className="heading-xl" style={{ lineHeight: '1.2', maxWidth: '800px', marginBottom: '20px' }}>
                            {post.title}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={16} />
                                {formatDate(post.created_at)}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <User size={16} />
                                By Bree Interiors
                            </span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.image_url && (
                    <div className="container" style={{ marginTop: '20px', position: 'relative', zIndex: 1, marginBottom: '40px' }}>
                        <div style={{ width: '100%', height: 'clamp(250px, 50vh, 500px)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                            <ImageWithSkeleton
                                src={post.image_url}
                                alt={post.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <article className="container" style={{ maxWidth: '800px' }}>
                    <div
                        style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: 'var(--color-charcoal)',
                            fontFamily: 'var(--font-body)'
                        }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                {/* Navigation footer */}
                <div className="container" style={{ maxWidth: '800px', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
                    <Link to="/blog" className="btn-outline" style={{ display: 'inline-block' }}>
                        View All Articles
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default BlogPost;
