import { IsAttributesValid, IsNotEmpty, IsNumber, IsString } from '@share';

export class ProductDtoBase {
    @IsString()
    @IsNotEmpty()
    name: string;
    description?: string;
    @IsNotEmpty()
    @IsNumber()
    price: number;
    @IsNumber()
    discountedPrice?: number;
    categoryIds?: string[];
    avatarCustomId?: string;
    removeImageIds: string[];
    @IsAttributesValid()
    attributes?: string;
}

export class ProductDto extends ProductDtoBase {
    @IsString()
    @IsNotEmpty()
    id: string;
}
