import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
    constructor(private readonly prismaService: PrismaService) {}
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const [tableName, column] = args?.constraints as string[];
        const currentId = (args.object as any).id;
        const dataExist = await this.prismaService[tableName].count({
            where: { [column]: value, ...(currentId ? { id: { not: currentId } } : {}) },
        });
        return !dataExist;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        const field = validationArguments.property;

        return `Значение поля ${field} уже используется.`;
    }
}
