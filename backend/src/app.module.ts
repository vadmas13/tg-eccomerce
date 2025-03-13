import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { IsExistingPropery, IsUnique } from '@share';

import { UserModule } from './user';
import { CategoryModule } from './category/category.module';
import { AuthModule } from '@auth';
import { ProductModule } from './product/product.module';
import { DocumentModule } from './document/document.module';
import { CartModule } from './cart/cart.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        CategoryModule,
        ProductModule,
        DocumentModule,
        CartModule,
        OrderModule,
    ],
    controllers: [OrderController],
    providers: [IsUnique, IsExistingPropery],
})
export class AppModule {}
