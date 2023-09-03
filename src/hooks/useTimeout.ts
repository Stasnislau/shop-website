import { useEffect, useRef, useState } from "react";

const useTimeout = (delay: number): [() => void, (callback: () => void) => void] => {
  const [currCallback, setCallback] = useState<{ callback: () => void }>({ callback: () => { } });
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            currCallback.callback();
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currCallback, delay]);

    const cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const set = (callback: () => void) => {
        setCallback({ callback });
    };

    return [cancel, set]
};

export default useTimeout;
