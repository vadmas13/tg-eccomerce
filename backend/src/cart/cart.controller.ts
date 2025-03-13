import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto';
import { QueryRequired } from '@share';
import { JwtAuthGuard } from '@auth';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getCart(@QueryRequired('userId') userId: string) {
        return this.cartService.getCart(userId, true);
    }

    @Get('productIds')
    async getCartProductIds(@QueryRequired('userId') userId: string) {
        const cart = await this.cartService.getCart(userId);
        return cart.items.map((x) => x.productId);
    }

    @Get('count')
    getCartCount(@QueryRequired('userId') userId: string) {
        return this.cartService.getCartCount(userId);
    }

    @Post('add')
    addToCart(@Body() dto: CartItemDto) {
        return this.cartService.changeCart(dto);
    }

    @Post('remove')
    removeFromCart(@Body() dto: CartItemDto) {
        return this.cartService.removeFromCart(dto);
    }
}
