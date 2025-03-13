import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { convertToSecondsUtil } from '../utils';

export const getCacheModuleStartegy = () =>
    CacheModule.registerAsync({
        isGlobal: true,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            ttl: convertToSecondsUtil(configService.get('JWT_EXP')),
        }),
        inject: [ConfigService],
    });
