import { SetMetadata } from '@nestjs/common';
import { SelfDecoratorParams } from '../models';

export const Self = (params: SelfDecoratorParams | string) =>
    SetMetadata('selfParams', typeof params == 'string' ? { userIDParam: params } : params);
