import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductService } from '@product';

@Module({
    providers: [CartService, ProductService],
    controllers: [CartController],
    exports: [CartService],
})
export class CartModule {}
