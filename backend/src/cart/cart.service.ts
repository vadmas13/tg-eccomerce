import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Cart, CartState } from '@prisma/client';
import { CartBaseItemDto, CartItemRemoveDto } from './dto';
import { ProductService } from '@product';
import { CartItemModel, CartResponseModel } from './models';
import { cartDefaultTotalValues } from './consts';

@Injectable()
export class CartService {
    isCreatingCartUserIds: string[] = [];
    constructor(
        private readonly prismaService: PrismaService,
        private readonly productService: ProductService,
    ) {}

    async getCart(userId: string, withStatistic?: boolean): Promise<CartResponseModel> {
        const cart = await this.findOrCreateCart(userId);
        if (!withStatistic) {
            return cart;
        }
        const { totalDiscountPrice, totalPrice, totalQuantity } = cart.items.reduce(
            (res, curr) => {
                const { price, discountedPrice } = curr.product;
                res.totalDiscountPrice += (discountedPrice ?? price) * curr.quantity;
                res.totalPrice += price * curr.quantity;
                res.totalQuantity += curr.quantity;
                return res;
            },
            { ...cartDefaultTotalValues },
        );

        return {
            totalDiscountPrice,
            totalPrice,
            totalQuantity,
            ...cart,
        };
    }

    async changeCart({ userId, ...dto }: CartBaseItemDto) {
        try {
            const cart = await this.findOrCreateCart(userId);
            if (!dto.quantity) {
                return await this.removeFromCart({ userId, ...dto, removeAll: true });
            }

            await this.productService.deleteProductCash(dto.productId, userId);

            const cartItem = await this.prismaService.cartItem.findFirst({
                where: { cartId: cart.id, productId: dto.productId },
            });

            if (!cartItem) {
                return this.prismaService.cartItem.create({
                    data: { cartId: cart.id, ...dto },
                });
            }

            return this.prismaService.cartItem.update({
                where: { id: cartItem.id },
                data: { ...cartItem, ...dto },
            });
        } catch (e) {
            throw new BadRequestException(`Приозошла ошибка при изменении данных в корзине: ${e}`);
        }
    }

    async removeFromCart({ removeAll, ...dto }: CartItemRemoveDto) {
        if (removeAll) {
            await this.productService.deleteProductCash(dto.productId, dto.userId);
            return this.prismaService.cartItem.deleteMany({
                where: { productId: dto.productId, cart: { userId: dto.userId } },
            });
        }
        return this.changeCart(dto);
    }

    async changeCartState(cartId: string, state: CartState) {
        return this.prismaService.cart.update({ where: { id: cartId }, data: { state } });
    }

    private async findOrCreateCart(userId: string): Promise<Cart & { items: CartItemModel[] }> {
        const existCart = await this.prismaService.cart.findFirst({
            where: { userId, state: CartState.CURRENT },
            include: {
                items: {
                    include: { product: { include: { documents: true } } },
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
        });
        if (existCart) {
            return existCart;
        }

        if (this.isCreatingCartUserIds.includes(userId)) {
            return new Promise((resolve) => {
                const interval = setInterval(async () => {
                    const cart = await this.prismaService.cart.findFirst({
                        where: { userId, state: CartState.CURRENT },
                        include: {
                            items: {
                                include: { product: { include: { documents: true } } },
                                orderBy: {
                                    id: 'asc',
                                },
                            },
                        },
                    });
                    if (cart) {
                        clearInterval(interval);
                        resolve(cart);
                    }
                }, 100);
            });
        }

        try {
            this.isCreatingCartUserIds = [...this.isCreatingCartUserIds, userId];
            const newCart = await this.prismaService.cart.create({
                data: { userId },
                include: { items: { include: { product: { include: { documents: true } } } } },
            });
            return newCart;
        } finally {
            this.isCreatingCartUserIds = this.isCreatingCartUserIds.filter((x) => x !== userId);
        }
    }

    async getCartCount(userId: string): Promise<number> {
        const cart = await this.findOrCreateCart(userId);
        return cart.items.reduce((res, curr) => {
            res += curr.quantity;
            return res;
        }, 0);
    }
}
