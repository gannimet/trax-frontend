import { useState } from 'react';

export const useAutoCompleteCache = <T>(): [
  (key: string) => T | undefined,
  (key: string, value: T) => void,
  () => void,
] => {
  const [cache] = useState<Map<string, T>>(new Map());

  const getCacheItem = (key: string): T | undefined => {
    return cache.get(key);
  };

  const setCacheItem = (key: string, value: T) => {
    cache.set(key, value);
  };

  const clearCache = () => {
    cache.clear();
  };

  return [getCacheItem, setCacheItem, clearCache];
};
