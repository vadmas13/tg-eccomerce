import { JwtPayload } from '../models';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from '@user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const user: User = await this.userService.findOne(payload.tgUserId).catch((err) => {
            this.logger.error(err);
            return null;
        });

        // TODO: проверка в таблице Tokens ?
        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.isBlocked) {
            throw new UnauthorizedException(user.blockedReason);
        }
        return payload;
    }
}
