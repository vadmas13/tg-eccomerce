import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderBaseDto, OrderPaymentStateDto, OrderStateDto } from './dto';
import { QueryRequired, Roles, RolesGuard } from '@share';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth';

@Controller('order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('all')
    @Roles(Role.ADMIN)
    getOrders(@Req() req: Request) {
        return this.orderService.getOrderList(req);
    }

    @Get()
    getOrder(@QueryRequired('orderId') orderId: string) {
        return this.orderService.getOrder(orderId);
    }

    @Get('list')
    getUserOrders(@QueryRequired('userId') _: string, @Req() req: Request) {
        return this.orderService.getOrderList(req);
    }

    @Post()
    createOrder(@Body() dto: OrderBaseDto) {
        return this.orderService.createOrder(dto);
    }

    @Patch()
    changeOrderState(@Body() dto: OrderStateDto) {
        return this.orderService.changeOrderState(dto);
    }

    @Patch()
    changeOrderPaymentState(@Body() dto: OrderPaymentStateDto) {
        return this.orderService.changeOrderPaymentState(dto);
    }

    @Delete()
    deleteOrder(@QueryRequired('orderId') orderId: string) {
        return this.orderService.removeOrder(orderId);
    }
}
