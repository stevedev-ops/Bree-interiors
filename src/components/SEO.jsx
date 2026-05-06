import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component to set page title and meta description.
 * Usage: <SEO title="Page Title" description="Short description" />
 */
const SEO = ({ title, description }) => {
    const keywords = "Bree Interiors, Mutembei Interiors, Brenda Mutembei, Interior Design Kenya, Afro-Modern Design, Bree Interirors, Interiror Design, Savannah Minimalism, Luxury Interiors Nairobi, Home Decor Kenya, Space Planning, Interior Architect Nairobi, Interior Styling, Furniture Design Kenya, Bespoke Interiors, Residential Design, Commercial Interior Design, Hospitality Design, Airbnb Styling, Decorators in Kenya, Best Interior Designers Nairobi, Modern Kenyan Interiors";
    
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Bree Interiors",
        "alternateName": ["Mutembei Interiors", "Brenda Mutembei Interiors", "Bree Interirors"],
        "url": "https://brendamutembeiinteriors.com",
        "logo": "https://brendamutembeiinteriors.com/logo.png",
        "sameAs": [
            "https://www.instagram.com/bree_interiors",
            "https://wa.me/254700000000"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-700-000-000",
            "contactType": "customer service"
        }
    };

    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph tags for better sharing */}
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />
            
            {/* JSON-LD Structured Data - Invisible to users, but readable by Google */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
