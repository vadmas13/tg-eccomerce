import { SetMetadata } from '@nestjs/common';
import { NotProviderParams } from '../models';

export const NotProvider = (params: NotProviderParams | string) =>
    SetMetadata('notProviderParams', typeof params == 'string' ? { userIDParam: params } : params);
