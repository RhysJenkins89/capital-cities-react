import { useState, useEffect } from "react";

const useLocalStorage = (storageKey: string, fallbackState: string) => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
};

export default useLocalStorage;

// const [continent, setContinent] = useLocalStoage('', 'europe');
