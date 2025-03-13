import { IsNotEmpty, IsString } from '@share';

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
    @IsNotEmpty()
    name: string;
}
