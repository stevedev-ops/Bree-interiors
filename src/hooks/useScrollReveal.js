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
        let mutationObserver;

        if (currentRef) {
            // Function to find and observe all reveal elements
            const observeElements = () => {
                const elements = currentRef.querySelectorAll('.reveal');
                elements.forEach((el) => {
                    // Only observe if it hasn't been active yet
                    if (!el.classList.contains('active')) {
                        observer.observe(el);
                    }
                });

                if (currentRef.classList.contains('reveal')) {
                    observer.observe(currentRef);
                }
            };

            // Initial observation
            observeElements();

            // Setup MutationObserver to watch for dynamically added elements (like async API data)
            mutationObserver = new MutationObserver((mutations) => {
                let shouldReObserve = false;
                for (let mutation of mutations) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        shouldReObserve = true;
                        break;
                    }
                }
                if (shouldReObserve) {
                    observeElements();
                }
            });

            mutationObserver.observe(currentRef, { childList: true, subtree: true });
        }

        return () => {
            if (currentRef) {
                const elements = currentRef.querySelectorAll('.reveal');
                elements.forEach((el) => observer.unobserve(el));
            }
            observer.disconnect();
            if (mutationObserver) {
                mutationObserver.disconnect();
            }
        };
    }, []);

    return ref;
};
