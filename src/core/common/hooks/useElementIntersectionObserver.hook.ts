import { MutableRefObject } from 'react';
import { useEffect, useMemo, useState } from 'react';

export default function useElementIntersectionObserver<T extends Element>(
    options: IntersectionObserverInit,
    targetRef: MutableRefObject<T>,
): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget: T = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);
    return isVisible;
}
