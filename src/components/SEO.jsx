import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component to set page title and meta description.
 * Usage: <SEO title="Page Title" description="Short description" />
 */
const SEO = ({ title, description }) => (
    <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {/* Open Graph tags for better sharing */}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="website" />
    </Helmet>
);

export default SEO;
