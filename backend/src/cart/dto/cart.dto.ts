import { IsExistingPropery, IsNumber, IsNotEmpty, IFieldNameProvider } from '@share';
import { Validate } from 'class-validator';

export class CartBaseItemDto {
    @IsNotEmpty()
    @Validate(IsExistingPropery, ['user', 'id'])
    userId: string;
    @IsNotEmpty()
    @Validate(IsExistingPropery, ['product', 'id'])
    productId: string;
    @IsNumber()
    quantity?: number;
}

export class CartItemDto extends CartBaseItemDto implements IFieldNameProvider {
    removeAll?: boolean;
    getFieldNames(): { [key: string]: string } {
        return {
            userId: 'Идентификатор пользователя',
        };
    }
}

export class CartItemRemoveDto extends CartBaseItemDto {
    removeAll?: boolean;
}
