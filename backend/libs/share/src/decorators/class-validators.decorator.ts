import { isDataView } from 'util/types';
import { isDefined, isNotDefined } from '../utils';
import {
    registerDecorator,
    ValidationOptions,
    isEmail,
    isNotEmpty,
    isString,
    maxLength,
    isNumber,
} from 'class-validator';

export function IsEmail(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Не валидный email' },
            validator: {
                validate(value) {
                    return isEmail(value);
                },
            },
        });
    };
}

export function IsNotEmpty(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isNotEmpty',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Поле обязательно к заполнению' },
            validator: {
                validate(value) {
                    return isNotEmpty(value);
                },
            },
        });
    };
}

export function IsString(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Поле должно быть строкой' },
            validator: {
                validate(value) {
                    return isString(value);
                },
            },
        });
    };
}

export function IsNumber(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Поле должно быть числом' },
            validator: {
                validate(value) {
                    return isNotDefined(value) || isNumber(value);
                },
            },
        });
    };
}

export function MaxLength(max: number, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: `'Максимальная длина поля ${max} символов'` },
            validator: {
                validate(value) {
                    return isDefined(value) ? maxLength(value, max) : true;
                },
            },
        });
    };
}

export function IsArrayString(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsArrayString',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Значения массива должны быть строковые' },
            validator: {
                validate(value) {
                    return Array.isArray(value) && value.every((x) => typeof x === 'string');
                },
            },
        });
    };
}
