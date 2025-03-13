import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { QueryRequired, Self, SelfGuard, TgUser, Public } from '@share';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards';

@Controller('user')
@UseGuards(JwtAuthGuard, SelfGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Self('userId')
    getUser(@QueryRequired('userId') userId: string) {
        return this.userService.findOne(userId);
    }

    @Post()
    @Public()
    create(@Body() dto: TgUser) {
        return this.userService.createOrUpdate(dto);
    }
}
