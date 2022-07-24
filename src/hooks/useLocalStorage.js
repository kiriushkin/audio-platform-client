import { useEffect } from 'react';

const useLocalStorage = (store, key, initialValue) => {
  const item = window.localStorage.getItem(key);
  let data;

  if (typeof store === 'string') data = item || initialValue;
  else data = item ? JSON.parse(item) : initialValue;

  useEffect(() => {
    if (typeof store !== 'string' || store === '') return;
    window.localStorage.setItem(key, store);
  }, [store]);

  useEffect(() => {
    if (
      (typeof store[key] === 'object' &&
        Object.values(store[key]).length === 0) ||
      typeof store === 'string'
    )
      return;

    const data = JSON.stringify(store[key]);
    window.localStorage.setItem(key, data);
  }, [store[key]]);

  return data;
};

export default useLocalStorage;
