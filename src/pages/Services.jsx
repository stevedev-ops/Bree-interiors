import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Services = () => {
    const pageRef = useScrollReveal();
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        if (openFaq === index) setOpenFaq(null);
        else setOpenFaq(index);
    }

    const faqs = [
        { q: "What is your typical project timeline?", a: "Depending on the scope, full-service residential projects typically take 3 to 6 months from concept to final installation." },
        { q: "What is your pricing structure?", a: "We charge a flat design fee based on the square footage and scope of the project, plus a procurement handling fee for items purchased through our studio." },
        { q: "Is there a minimum project budget?", a: "For full-service design, we recommend a minimum furnishing budget of $20,000 to ensure we can deliver the Bree Interiors standard of luxury." },
        { q: "How does the virtual consultation work for diaspora clients?", a: "We conduct virtual walk-throughs, share digital mood boards and 3D renders, and manage the local procurement and installation while keeping you updated via video calls." }
    ];

    const services = [
        { title: "Full-Service Interior Design", desc: "Comprehensive design for entire homes. From spatial planning and custom millwork to final styling. We handle every detail, taking the stress completely off your shoulders." },
        { title: "Luxury Airbnb Styling", desc: "Strategic design that maximizes ROI. We create photogenic, durable, and unforgettable spaces that stand out in the competitive Nairobi and coastal short-term rental markets." },
        { title: "Virtual Design (Diaspora)", desc: "Building a home in Kenya from abroad? We are your trusted eyes on the ground. We provide full design packages and oversee local installation." },
        { title: "Commercial Design", desc: "Boutique hotels, luxury lodges, and high-end offices. We design commercial spaces that embody your brand and provide an exceptional experience for your guests." }
    ];

    return (
        <div ref={pageRef} style={{ paddingTop: '80px' }}>
            <section className="section bg-secondary text-center">
                <div className="container reveal">
                    <h1 className="heading-xl mb-4">Our Services</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Tailored design solutions for exclusive residential and commercial spaces.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                        {services.map((svc, index) => (
                            <div key={svc.title} className={`reveal delay-${(index % 2) * 100}`} style={{ padding: '3rem', border: '1px solid #EBE6DF' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-charcoal)' }}>{svc.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>{svc.desc}</p>
                                <a href="#contact" className="btn-outline">Inquire</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-secondary" id="contact">
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="heading-lg text-center mb-8 reveal">Frequently Asked Questions</h2>
                    <div className="reveal delay-200">
                        {faqs.map((faq, index) => (
                            <div key={index} style={{ borderBottom: '1px solid #dcd5cc', padding: '1.5rem 0' }}>
                                <button
                                    onClick={() => toggleFaq(index)}
                                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', fontSize: '1.2rem', fontWeight: '500', color: 'var(--color-charcoal)' }}
                                >
                                    {faq.q}
                                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {openFaq === index && (
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        {faq.a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
