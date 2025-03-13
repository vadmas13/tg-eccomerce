import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Put,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
    CurrentUser,
    imagesFileTypeRegex,
    MAX_PICTIRE_SIZE,
    QueryRequired,
    Roles,
    RolesGuard,
} from '@share';
import { ProductDto, ProductDtoBase } from './dto';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '@auth';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtPayload } from '@auth/models';

@Controller('product')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() dto: ProductDtoBase) {
        return this.productService.create(dto);
    }

    @Post('uploadImages')
    @UseInterceptors(FilesInterceptor('files'))
    uploadImages(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: MAX_PICTIRE_SIZE }),
                    new FileTypeValidator({ fileType: imagesFileTypeRegex }),
                ],
            }),
        )
        files: Express.Multer.File[],
        @QueryRequired('productId') productId: string,
        @Body() filesData: { uuids: string[] },
    ) {
        return this.productService.updateProductImages(productId, files, filesData.uuids);
    }

    @Get('list')
    getList(@Req() req: Request) {
        return this.productService.getProducts(req);
    }

    @Get()
    getProduct(@QueryRequired('id') productId: string, @CurrentUser() { id }: JwtPayload) {
        return this.productService.getProduct(productId, id);
    }

    @Put()
    update(@Body() dto: ProductDto) {
        return this.productService.update(dto);
    }

    @Delete()
    @Roles(Role.ADMIN)
    deleteProduct(@QueryRequired('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
