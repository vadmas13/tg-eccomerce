import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user';
import { jwtModuleAsyncOptions } from './config';
import { AUTH_STRTAGIES } from './strategies';
import { AUTH_GUARDS } from './guards';
import { HttpModule } from '@nestjs/axios';

@Module({
    controllers: [AuthController],
    providers: [AuthService, ...AUTH_STRTAGIES, ...AUTH_GUARDS],
    imports: [
        PassportModule,
        JwtModule.registerAsync(jwtModuleAsyncOptions()),
        UserModule,
        HttpModule,
    ],
})
export class AuthModule {}
