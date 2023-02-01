import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue?: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme");
  const isEnabled = typeof enabled !== "undefined" && enabled;

  useEffect(() => {
    const className = "dark";
    const bodyClass = document.body.classList;

    isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};
