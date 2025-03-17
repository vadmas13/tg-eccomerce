import { Order, OrderStatus, OrderAddressType, OrderPaymentState } from '@prisma/client';
import { IsEnumValue, IsExistingPropery, MaxLength, IsNotEmpty } from '@share';
import { Validate } from 'class-validator';

export class OrderBaseDto
    implements
        Omit<
            Order,
            | 'id'
            | 'createdAt'
            | 'updatedAt'
            | 'cartId'
            | 'totalAmount'
            | 'totalPrice'
            | 'status'
            | 'payementStatus'
            | 'orderTrackId'
        >
{
    @IsNotEmpty()
    @Validate(IsExistingPropery, ['user', 'id'])
    userId: string;
    @IsNotEmpty()
    @MaxLength(1000)
    address: string;
    @IsNotEmpty()
    @IsEnumValue(OrderAddressType)
    addressType: OrderAddressType;
    @IsNotEmpty()
    @MaxLength(1000)
    firstName: string;
    @MaxLength(1000)
    secondName: string;
    @IsNotEmpty()
    @MaxLength(1000)
    lastName: string;
    @MaxLength(2000)
    comment: string | null;
    saveUserData?: boolean;
}

export class OrderStateDto {
    @IsNotEmpty()
    @Validate(IsExistingPropery, ['order', 'id'])
    id: string;
    @IsNotEmpty()
    @IsEnumValue(OrderStatus)
    status: OrderStatus;
}

export class OrderPaymentStateDto {
    @IsNotEmpty()
    @Validate(IsExistingPropery, ['order', 'id'])
    id: string;
    @IsNotEmpty()
    @IsEnumValue(OrderPaymentState)
    status: OrderPaymentState;
}
