import { useEffect, useRef, useState } from 'react';

type Options = {
    /* https://dev.to/producthackers/intersection-observer-using-react-49ko

    *  root: The element that is used as the viewport for checking visibility of the target. 
    *  Must be the ancestor of the target. Defaults to the browser viewport if not 
    *  specified or null.
    */
    root: any, 
    /* rootMargin: This set of values serves to grow or shrink each side of the root element's
    *  bounding box before computing intersections, the options are similar to those of margin in CSS.
    */
    rootMargin: string,
    /**
     *  Either a single number or an array of numbers which indicate at what percentage of the target's 
     *  visibility the *  observer's callback should be executed, ranges from 0 to 1.0, where 1.0 means 
     *  every pixel is visible in the *viewport.
     */
    threshold: number
}

export const useElementOnScreen = (options: Options): [any, boolean] => {
    const containerRef = useRef(null);
    const [ isVisible, setIsVisible ] = useState(false);

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [ entry ] = entries;
        setIsVisible(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        if (containerRef.current) {
            observer.observe(containerRef.current);
            console.log('containerRef.current', containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        }
    }, [containerRef, options]);

    return [containerRef, isVisible];
}