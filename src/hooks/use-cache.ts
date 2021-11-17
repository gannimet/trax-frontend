import { useState } from 'react';

export type GetCacheItemFn<T> = (key: string) => T | undefined;

export type SetCacheItemFn<T> = (key: string, value: T) => void;

export type ClearCacheFn = () => void;

export const useCache = <T>(): [
  GetCacheItemFn<T>,
  SetCacheItemFn<T>,
  ClearCacheFn,
] => {
  const [cache] = useState<Map<string, T>>(new Map());

  const getCacheItem: GetCacheItemFn<T> = (key) => {
    return cache.get(key);
  };

  const setCacheItem: SetCacheItemFn<T> = (key, value) => {
    cache.set(key, value);
  };

  const clearCache: ClearCacheFn = () => {
    cache.clear();
  };

  return [getCacheItem, setCacheItem, clearCache];
};
