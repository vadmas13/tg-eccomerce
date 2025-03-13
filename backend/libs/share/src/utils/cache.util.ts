import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class CacheManagerData<T> {
    // TODO: проработать момент, как заиджектить cacheManager
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
}
