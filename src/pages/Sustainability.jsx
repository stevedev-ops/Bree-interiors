import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Sustainability = () => {
    const pageRef = useScrollReveal();

    return (
        <div ref={pageRef} style={{ paddingTop: '80px' }}>
            <section className="section bg-secondary text-center">
                <div className="container reveal">
                    <span className="subtitle mb-2">Our Commitment</span>
                    <h1 className="heading-xl mb-4">Luxury Rooted in<br />Sustainability.</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        We believe that true luxury is mindful. Bree Interiors is committed to eco-conscious design that uplifts local communities and respects the environment.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="grid grid-2" style={{ gap: '4rem' }}>
                        <div className="reveal">
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-terracotta)', marginBottom: '1rem' }}>Locally Sourced Materials</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                Every project prioritizes materials sourced within Kenya. From Machakos stone to Lamu mangrove poles and sustainable cedar, we reduce our carbon footprint while celebrating local textures.
                            </p>
                        </div>
                        <div className="reveal delay-200">
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-terracotta)', marginBottom: '1rem' }}>Artisan Collaboration</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                We don't just buy locally; we build relationships. We collaborate directly with Kenyan weavers, woodcarvers, and potters, ensuring fair wages and keeping traditional craftsmanship alive.
                            </p>
                        </div>
                        <div className="reveal delay-100">
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-terracotta)', marginBottom: '1rem' }}>Handcrafted Furniture</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                Instead of importing mass-produced pieces, we design bespoke furniture that is handmade in Nairobi. This allows for unparalleled quality control and unique items tailored to your space.
                            </p>
                        </div>
                        <div className="reveal delay-300">
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-terracotta)', marginBottom: '1rem' }}>Eco-Conscious Approach</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                We incorporate energy-efficient lighting, natural ventilation strategies, and low-VOC paints in our designs to ensure your home is as healthy as it is beautiful.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sustainability;
