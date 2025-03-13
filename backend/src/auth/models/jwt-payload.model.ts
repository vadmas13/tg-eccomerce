import { Role } from '@prisma/client';

export interface JwtPayload {
    tgUserId: string;
    id: string;
    username: string;
    roles: Role[];
    photoUrl?: string;
}
