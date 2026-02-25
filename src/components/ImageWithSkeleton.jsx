import React from 'react';
import { motion } from 'framer-motion';

/**
 * ImageWithSkeleton shows a gray placeholder while the image loads.
 * Props: src, alt, style, className, ...rest
 */
const ImageWithSkeleton = ({ src, alt, style, className, ...rest }) => {
    const [loaded, setLoaded] = React.useState(false);
    return (
        <div style={{ position: 'relative', ...style }} className={className}>
            {!loaded && (
                <div
                    style={{
                        backgroundColor: 'var(--color-slate-200)',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded ? 'block' : 'none' }}
                onLoad={() => setLoaded(true)}
                {...rest}
            />
        </div>
    );
};

export default ImageWithSkeleton;
