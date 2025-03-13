import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAttributesValid(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isAttributesValid',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!value) return true;
                    if (typeof value !== 'string') return false;

                    const regex =
                        /^(?:[а-яА-ЯёЁa-zA-Z0-9\s]+:\s*[а-яА-ЯёЁa-zA-Z0-9\s]+(?:;\s*|\n\s*))*(?:[а-яА-ЯёЁa-zA-Z0-9\s]+:\s*[а-яА-ЯёЁa-zA-Z0-9\s]+)$/;
                    return regex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} должно быть в формате "Ключ: значение; Ключ: значение;"`;
                },
            },
        });
    };
}
