import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { SelfDecoratorParams } from '../models';
import { Role, User } from '@prisma/client';

@Injectable()
export class SelfGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user as User; //Use passport authentication strategy

        //Priority on method meta
        let selfParams = this.reflector.get<SelfDecoratorParams>(
            'selfParams',
            context.getHandler(),
        );
        if (!selfParams)
            //Check for class meta
            selfParams = this.reflector.get<SelfDecoratorParams>('selfParams', context.getClass());
        //If still no meta, pass
        if (!selfParams) return true;

        const allowAdmins = selfParams.allowAdmins || true;
        const userIDParam = selfParams.userIDParam;

        if (!user) return false;
        if (
            request.body[userIDParam] == user.id ||
            request.params[userIDParam] == user.id ||
            request.query[userIDParam] == user.id
        )
            return true;
        if (allowAdmins && user.roles.includes(Role.ADMIN)) return true;
    }
}
