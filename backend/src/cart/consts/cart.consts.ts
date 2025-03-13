import { CartResponseModel } from '@cart/models';

export const cartDefaultTotalValues: Pick<
    CartResponseModel,
    'totalDiscountPrice' | 'totalQuantity' | 'totalPrice'
> = {
    totalDiscountPrice: 0,
    totalPrice: 0,
    totalQuantity: 0,
};
