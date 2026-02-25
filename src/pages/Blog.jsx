import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (data) {
                setPosts(data);
            } else if (error) {
                console.error("Error fetching blog posts:", error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <PageTransition>
            <SEO
                title="Blog & Insights | Bree Interiors"
                description="Insights, inspiration, and stories from the world of luxury Afro-Modern interior design."
            />
            <div style={{ paddingTop: '80px', backgroundColor: 'var(--color-warm-white)', minHeight: '100vh' }}>
                <div className="container">
                    <section style={{ textAlign: 'center', padding: '60px 0', borderBottom: '1px solid #e5e7eb', marginBottom: '40px' }}>
                        <h1 className="heading-xl" style={{ color: 'var(--color-charcoal)', marginBottom: '15px' }}>
                            Our <span style={{ color: 'var(--color-terracotta)' }}>Blog</span>
                        </h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            Insights, inspiration, and stories from the world of luxury Afro-Modern interior design.
                        </p>
                    </section>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>Loading blog entries...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No blog entries published yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {posts.map((post) => (
                                <Link to={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <article style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease, boxShadow 0.3s ease', ':hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' } }}>

                                        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '60%', backgroundColor: '#f3f4f6' }}>
                                            {post.image_url ? (
                                                <ImageWithSkeleton
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                                />
                                            ) : (
                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb', color: '#9ca3af' }}>
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <Calendar size={14} />
                                                    {formatDate(post.created_at)}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <User size={14} />
                                                    Bree Interiors
                                                </span>
                                            </div>

                                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-charcoal)', marginBottom: '10px', lineHeight: '1.3' }}>
                                                {post.title}
                                            </h3>

                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                                                {post.excerpt || (post.content && post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...')}
                                            </p>

                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-terracotta)', fontWeight: '500', fontSize: '0.95rem' }}>
                                                Read Article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Newsletter CTA */}
                <section style={{ backgroundColor: 'var(--color-olive)', color: 'var(--color-warm-white)', padding: '60px 0', marginTop: '60px' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2 className="heading-lg" style={{ marginBottom: '15px' }}>Subscribe to our Blog</h2>
                        <p style={{ maxWidth: '500px', margin: '0 auto', opacity: 0.9, marginBottom: '25px' }}>Get the latest design insights and inspiration delivered directly to your inbox.</p>
                        <form style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '450px', margin: '0 auto', justifyContent: 'center' }} onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                            <input type="email" placeholder="Your email address" required style={{ flex: 1, minWidth: '200px', padding: '12px 20px', borderRadius: '4px', border: 'none', fontFamily: 'inherit' }} />
                            <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--color-charcoal)', color: 'white', border: 'none' }}>Subscribe</button>
                        </form>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Blog;
