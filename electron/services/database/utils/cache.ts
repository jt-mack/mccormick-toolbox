import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // Default TTL: 5 minutes

export const setCache = (key: string, value: any, ttl: number=300) => {
  cache.set(key, value, ttl);
};

export const getCache = (key: string): any | undefined => {
  return cache.get(key);
};

export const deleteCache = (key: string) => {
  cache.del(key);
};

export const clearCache = () => {
  cache.flushAll();
};