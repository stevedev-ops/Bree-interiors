import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';

const DesignJourney = () => {
    const pageRef = useScrollReveal();
    const [content, setContent] = useState({
        journey_subtitle: 'Process',
        journey_title: 'The Design Journey',
        journey_desc: 'A seamless, premium, and highly organized experience from the first sketch to the final reveal.'
    });

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
        };
        fetchContent();
    }, []);

    const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

    const steps = [
        { num: '01', title: 'Discovery Consultation', desc: 'We start with an in-depth conversation to understand your lifestyle, aesthetic preferences, and practical needs. We discuss budget, timeline, and overall vision.' },
        { num: '02', title: 'Concept & Mood Boards', desc: 'Our team develops initial concepts, translating your vision into tangible mood boards featuring suggested color palettes, textures, and key pieces.' },
        { num: '03', title: '3D Render Presentation', desc: 'Visualize the future. We provide high-quality 3D renders of your space so you can see exactly how the light, materials, and furniture will interact.' },
        { num: '04', title: 'Procurement & Custom Pieces', desc: 'We handle all sourcing, relying on our extensive network of local Kenyan artisans and global suppliers to bring premium materials to your project.' },
        { num: '05', title: 'Installation & Styling', desc: 'Our white-glove installation team takes over. We manage the logistics, place every piece of furniture, and style the space down to the last vase and throw pillow.' },
        { num: '06', title: 'Final Reveal', desc: 'Welcome home. We walk you through your newly designed space, ensuring every detail exceeds your expectations.' },
    ];

    return (
        <div ref={pageRef} style={{ paddingTop: '80px' }}>
            <section className="section bg-secondary text-center">
                <div className="container reveal">
                    <span className="subtitle mb-2">{content.journey_subtitle}</span>
                    <h1 className="heading-xl mb-4">{renderHTML(content.journey_title)}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        {content.journey_desc}
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {steps.map((step, index) => (
                            <div
                                key={step.num}
                                className={`reveal delay-${(index % 3) * 100}`}
                                style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    marginBottom: '4rem',
                                    paddingBottom: '3rem',
                                    borderBottom: index !== steps.length - 1 ? '1px solid #EBE6DF' : 'none'
                                }}
                            >
                                <div style={{
                                    fontSize: '3.5rem',
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--color-sand)',
                                    lineHeight: '1',
                                    opacity: 0.7
                                }}>
                                    {step.num}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DesignJourney;
