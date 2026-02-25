import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition wraps page content with a simple fade/slide animation.
 * Usage: <PageTransition>{children}</PageTransition>
 */
const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%' }}
    >
        {children}
    </motion.div>
);

export default PageTransition;
