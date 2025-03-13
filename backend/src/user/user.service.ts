import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { TgUser } from '@share';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Role, User } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async createOrUpdate(dto: TgUser) {
        try {
            const user = await this.prismaService.user.upsert({
                where: {
                    tgUserId: dto.tgUserId,
                },
                create: { ...dto, roles: [Role.USER] },
                update: dto,
            });
            return user;
        } catch (e) {
            throw new BadRequestException(`Ошибка создания/обновления пользователя: ${e}`);
        }
    }

    async findOrCreate(dto: TgUser) {
        const existUser = await this.findOne(dto.tgUserId, dto.username);
        if (existUser) {
            return existUser;
        }
        return this.createOrUpdate(dto);
    }

    async findOne(tgUserIdOrId: string, username?: string, isReset = false): Promise<User | null> {
        if (isReset) {
            await this.cacheManager.del(tgUserIdOrId);
        }
        const user = await this.cacheManager.get<User>(tgUserIdOrId);
        if (!user) {
            console.log('not Cache User');
            const user = await this.prismaService.user.findFirst({
                where: {
                    OR: [
                        {
                            tgUserId: tgUserIdOrId,
                            username: username,
                        },
                        {
                            id: tgUserIdOrId,
                        },
                    ],
                },
            });

            if (!user) {
                return null;
            }
            await this.cacheManager.set(tgUserIdOrId, user);
            return user;
        }
        console.log('Cache User');
        return user;
    }

    async updateUserFields(id: string, data: Partial<User>) {
        return this.prismaService.user.update({ where: { id }, data });
    }
}
