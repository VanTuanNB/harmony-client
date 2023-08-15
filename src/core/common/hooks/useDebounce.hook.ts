import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}
