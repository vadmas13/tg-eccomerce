import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartService } from '@cart';
import { UserService } from '@user';
import { ProductModule } from '@product';

@Module({
    imports: [ProductModule],
    controllers: [OrderController],
    providers: [OrderService, CartService, UserService],
    exports: [OrderService],
})
export class OrderModule {}
