import { useState, useEffect } from "react";
import { useDidMountEffect } from "./useDidMountEffect";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    return JSON.parse(saved);
  }

  return defaultValue;
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const state = getStorageValue(key, defaultValue);
    setValue(state);
  }, []);

  useDidMountEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
};
