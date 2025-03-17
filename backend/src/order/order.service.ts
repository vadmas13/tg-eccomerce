import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { OrderBaseDto, OrderPaymentStateDto, OrderStateDto } from './dto';
import { CartService } from '@cart';
import { CartState, Order, OrderPaymentState, OrderStatus } from '@prisma/client';
import { PaginationModel, getEntityListPagination } from '@share';
import { Request } from 'express';
import { mapOrdersQueryParams } from './mappers';
import { getOrderListFilters } from './utils';
import { UserService } from '@user';

@Injectable()
export class OrderService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cartService: CartService,
        private readonly userService: UserService,
    ) {}

    async getOrderList(req: Request): Promise<PaginationModel<Order[]>> {
        const { query } = req;
        const queryParams = mapOrdersQueryParams(query);

        const data = await this.prismaService.order.findMany({
            where: getOrderListFilters(queryParams),
            orderBy: queryParams.sort,
            ...getEntityListPagination(queryParams.pagination),
            include: {
                cart: {
                    include: { items: { include: { product: { include: { documents: true } } } } },
                },
            },
        });

        const count = await this.prismaService.order.count({
            where: getOrderListFilters(queryParams),
        });

        const result: PaginationModel<Order[]> = {
            data,
            totalCount: count,
            pageSize: queryParams.pagination.pageSize,
            page: queryParams.pagination.page,
            lastPage: Math.ceil(count / queryParams.pagination.pageSize),
        };

        return result;
    }

    getOrder(id: string) {
        return this.prismaService.order.findFirst({
            where: { id },
            include: {
                cart: {
                    include: { items: { include: { product: { include: { documents: true } } } } },
                },
            },
        });
    }

    async createOrder({ saveUserData, ...dto }: OrderBaseDto) {
        const cart = await this.cartService.getCart(dto.userId, true);
        if (!cart) {
            throw new NotFoundException('Корзина пользователя не найдена');
        }
        const data: Omit<Order, 'createdAt' | 'updatedAt' | 'id' | 'orderTrackId'> = {
            ...dto,
            cartId: cart.id,
            totalAmount: cart.totalQuantity,
            totalPrice: cart.totalDiscountPrice,
            status: OrderStatus.PENDING,
            payementStatus: OrderPaymentState.NOT_PAID,
        };

        try {
            const order = await this.prismaService.order.create({ data });
            await this.cartService.changeCartState(cart.id, CartState.ORDERED);
            if (saveUserData) {
                await this.userService.updateUserFields(cart.userId, {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    secondName: dto.secondName,
                });
            }

            return order;
        } catch (e) {
            throw new BadRequestException(`Ошибка создания заказа: ${e}`);
        }
    }

    async changeOrderState({ id, status }: OrderStateDto) {
        return this.prismaService.order.update({ where: { id }, data: { status } });
    }

    async changeOrderPaymentState({ id, status }: OrderPaymentStateDto) {
        return this.prismaService.order.update({ where: { id }, data: { payementStatus: status } });
    }

    removeOrder(id: string) {
        return this.prismaService.order.delete({ where: { id } });
    }
}
