import { useState, useEffect } from 'react';

// hook to manage state with localStorage
export function useLocalStorage(key, initialValue) {
  // Initialize the state with value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved); // If the value exists in localStorage, parse it
    } else {
      return initialValue; // if not, use the provided initialValue
    }
  });

  // Update localStorage
  useEffect(() => {
    if (storedValue !== undefined) {
      localStorage.setItem(key, JSON.stringify(storedValue)); // Save
    }
  }, [key, storedValue]); // Runs when the key or storedValue changes

  return [storedValue, setStoredValue]; // Return the stored value and the setter function
}
