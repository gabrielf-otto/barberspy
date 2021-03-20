import Redis, { Redis as Client } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '@config/cache';


class RedisCacheProvider implements ICacheProvider {
   private client: Client;

   constructor() {
      this.client = new Redis(cacheConfig.config.redis);
   }

   async set(key: string, value: any): Promise<void> {
      await this.client.set(key, JSON.stringify(value));
   }

   async get<T>(key: string): Promise<T | null> 
   {
      const data = await this.client.get(key);
      if (!data) {
         return null;
      }

      return JSON.parse(data) as T;
   }

   async invalidate(key: string): Promise<void> {
      await this.client.del(key);
   }

   async invalidatePrefix(prefix: string): Promise<void> 
   {
      const keys = await this.client.keys(`${prefix}:*`);
      const pipeline = this.client.pipeline();

      keys.forEach(key => {
         pipeline.del(key);
      });

      await pipeline.exec();
   }
}


export default RedisCacheProvider;
