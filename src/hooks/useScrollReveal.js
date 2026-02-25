import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Optional: observer.unobserve(entry.target); if you only want it to reveal once
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        const currentRef = ref.current;

        // Select all elements with the 'reveal' class within this ref
        if (currentRef) {
            const elements = currentRef.querySelectorAll('.reveal');
            elements.forEach((el) => observer.observe(el));

            // Also observe the container itself if it has the reveal class
            if (currentRef.classList.contains('reveal')) {
                observer.observe(currentRef);
            }
        }

        return () => {
            if (currentRef) {
                const elements = currentRef.querySelectorAll('.reveal');
                elements.forEach((el) => observer.unobserve(el));
            }
            observer.disconnect();
        };
    }, []);

    return ref;
};
