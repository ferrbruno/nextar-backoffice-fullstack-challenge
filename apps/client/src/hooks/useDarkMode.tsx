import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T | undefined, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>();

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);

      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error(error);

      setStoredValue(initialValue);
    }
  }, [initialValue, key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export const useDarkMode = (): [
  boolean | undefined,
  (value: boolean) => void
] => {
  const [enabled, setEnabled] = useLocalStorage<boolean>("dark-theme");
  const isEnabled = typeof enabled !== "undefined" && enabled;

  useEffect(() => {
    const className = "dark";
    const bodyClass = document.body.classList;

    isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};
