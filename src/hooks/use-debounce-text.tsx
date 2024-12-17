import { useEffect, useState } from "react";

export const useDebounceText = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
};
