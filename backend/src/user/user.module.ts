import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getCacheModuleStartegy } from '@share';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [PassportModule, getCacheModuleStartegy()],
    exports: [UserService],
})
export class UserModule {}
