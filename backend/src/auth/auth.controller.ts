import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './models';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { REFRESH_TOKEN } from '@share/consts';
import { Cookie, Public } from '@share/decorators';
import { TgUser } from '@share';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post()
    async auth(@Body() dto: TgUser, @Res() res: Response) {
        const tokens = await this.authService.auth(dto);
        if (!tokens) {
            throw new BadRequestException(`Не получается войти с данными ${JSON.stringify(dto)}`);
        }
        this.setRefreshTokenToCookies(tokens, res);
    }

    @Get('refresh-tokens')
    async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.refreshTokens(refreshToken);
        if (!tokens) {
            throw new UnauthorizedException();
        }
        this.setRefreshTokenToCookies(tokens, res);
    }

    @Post('refresh-tokens')
    async refreshTokensBody(@Body() dto: { refreshToken: string }, @Res() res: Response) {
        if (!dto.refreshToken) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.refreshTokens(dto.refreshToken);
        if (!tokens) {
            throw new UnauthorizedException();
        }
        this.setRefreshTokenToCookies(tokens, res);
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        }
        res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: this.configService.get('NODE_ENV', 'development') === 'production',
            path: '/',
        });
        res.status(HttpStatus.CREATED).json({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken.token,
        });
    }
}
