import { IsString, IsNotEmpty } from '../decorators';

export class TgUser {
    @IsString()
    @IsNotEmpty()
    tgUserId: string;
    @IsString()
    @IsNotEmpty()
    username: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
}
