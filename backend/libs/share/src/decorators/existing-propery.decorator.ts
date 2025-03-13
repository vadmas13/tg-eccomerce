import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsExistPropery', async: true })
@Injectable()
export class IsExistingPropery implements ValidatorConstraintInterface {
    constructor(private readonly prismaService: PrismaService) {}
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const [tableName, column] = args?.constraints as string[];
        const dataExist = await this.prismaService[tableName].count({ where: { [column]: value } });
        return !!dataExist;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        const field = validationArguments.property;

        return `Не существующее значение параметра: ${field}`;
    }
}
