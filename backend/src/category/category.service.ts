import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CategoryDto, UpdateCategoryDto } from './dto';
import { Category } from '@prisma/client';
import { PaginationModel } from '@share';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(
        name?: string,
        page?: number,
        pageSize = 10,
    ): Promise<PaginationModel<Category[]>> {
        const data = await this.prismaService.category.findMany({
            where: { name: { contains: name, mode: 'insensitive' } },
            take: page ? page * pageSize : undefined,
        });
        const count = await this.prismaService.category.count({
            where: { name: { contains: name, mode: 'insensitive' } },
        });
        return {
            data,
            totalCount: count,
            pageSize,
            page,
            lastPage: Math.ceil(count / pageSize),
        };
    }

    findById(id: string) {
        return this.prismaService.category.findFirst({ where: { id } });
    }

    async create(dto: CategoryDto) {
        const existCategory = await this.prismaService.category.findFirst({
            where: {
                name: dto.name,
            },
        });
        if (existCategory) {
            throw new ConflictException('Категория с таким названием уже существует');
        }
        return this.prismaService.category.create({ data: dto });
    }

    async update({ id, ...dto }: UpdateCategoryDto) {
        const existCategory = await this.prismaService.category.findFirst({
            where: {
                AND: [{ name: dto.name }, { id: { not: id } }],
            },
        });
        if (existCategory) {
            throw new ConflictException('Категория с таким названием уже существует');
        }
        return this.prismaService.category.update({ where: { id }, data: dto });
    }

    delete(roleId: string) {
        return this.prismaService.category.delete({ where: { id: roleId } });
    }
}
