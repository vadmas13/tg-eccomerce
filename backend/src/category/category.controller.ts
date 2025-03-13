import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { QueryRequired, Roles, RolesGuard } from '@share';
import { CategoryService } from './category.service';
import { CategoryDto, UpdateCategoryDto } from './dto';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '@auth';
import { toNumber } from 'lodash';

@Controller('category')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('list')
    categoryList(
        @Query('name') name?: string,
        @Query('page') page?: string,
        @Query('pageSize') pageSize?: string,
    ) {
        return this.categoryService.getAll(
            name,
            page ? toNumber(page) : undefined,
            pageSize ? toNumber(pageSize) : undefined,
        );
    }

    @Get()
    async category(@QueryRequired('id') id: string) {
        const category = await this.categoryService.findById(id);
        if (!category) {
            throw new NotFoundException('Категории с таким идентификатором не существует');
        }
        return category;
    }

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() dto: CategoryDto) {
        return this.categoryService.create(dto);
    }

    @Put()
    @Roles(Role.ADMIN)
    update(@Body() dto: UpdateCategoryDto) {
        return this.categoryService.update(dto);
    }

    @Delete()
    @Roles(Role.ADMIN)
    delete(@QueryRequired('id') id: string) {
        return this.categoryService.delete(id);
    }
}
