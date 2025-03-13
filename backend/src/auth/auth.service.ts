import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Token, User } from '@prisma/client';
import { PrismaService } from '@prisma';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './models';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { nullableToken } from '@share/consts';
import { TgUser } from '@share';
import { UserService } from '@user';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly userService: UserService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async auth(dto: TgUser): Promise<Tokens> {
        const user = await this.userService.findOrCreate(dto);
        return this.generateTokens(user);
    }

    async refreshTokens(refreshToken: string): Promise<Tokens> {
        console.log('refreshToken', refreshToken);
        const token = await this.prismaService.token.delete({
            where: { token: refreshToken },
        });
        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.prismaService.user.findFirst({ where: { id: token.userId } });
        return this.generateTokens(user);
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({ where: { token } });
    }

    private async generateTokens(user: User): Promise<Tokens> {
        const accessToken =
            'Bearer ' +
            this.jwtService.sign({
                tgUserId: user.tgUserId,
                id: user.id,
                roles: user.roles,
                username: user.username,
                photoUrl: user.photoUrl,
            });
        const refreshToken = await this.getRefreshToken(user.id);
        return { accessToken, refreshToken };
    }

    private async getRefreshToken(userId: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
            },
        });
        const token = _token?.token ?? nullableToken;
        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
            },
            create: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
                userId,
            },
        });
    }
}
