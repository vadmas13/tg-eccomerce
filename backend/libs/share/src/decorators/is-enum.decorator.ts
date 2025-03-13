import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEnumValueConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: any) {
        const enumType = args.constraints[0];
        return Object.values(enumType).includes(value);
    }

    defaultMessage(args: any) {
        const enumType = args.constraints[0];
        return `${args.property} должно принимать одно из значений: ${Object.values(enumType).join(
            ', ',
        )}`;
    }
}

export function IsEnumValue(enumType: any, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [enumType],
            validator: IsEnumValueConstraint,
        });
    };
}
