import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { IFieldNameProvider } from '../models';

export const classValidatorException = () =>
    new ValidationPipe({
        exceptionFactory: (errors) => {
            const result = errors.map((error) => {
                const target = error.target as IFieldNameProvider;

                const fieldName =
                    target && typeof target.getFieldNames === 'function'
                        ? target.getFieldNames()[error.property] || error.property
                        : error.property;

                return {
                    property: error.property,
                    fieldName, // Получаем наименование поля
                    message: error.constraints?.[Object.keys(error.constraints)[0]], // Сообщение об ошибке
                };
            });
            return new BadRequestException(result);
        },
    });
