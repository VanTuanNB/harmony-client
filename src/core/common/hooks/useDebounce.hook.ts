import { useEffect, useState } from 'react';

export default function useDebounce(value: number, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}
