import { getCache, setCache } from '../utils/cache';

export const cachedQuery = async <T>(
  cacheKey: string,
  queryFn: () => Promise<T>,
  ttl?: number // Time-to-live in seconds
): Promise<T> => {
  // Check if value is in cache
  const cachedValue = getCache(cacheKey);
  if (cachedValue) {
    console.log(`Cache hit for key: ${cacheKey}`);
    return cachedValue as T;
  }

  console.log(`Cache miss for key: ${cacheKey}`);
  // Execute query and cache the result
  const result = await queryFn();
  setCache(cacheKey, result, ttl);
  return result;
};