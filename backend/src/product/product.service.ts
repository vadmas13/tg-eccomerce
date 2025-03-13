import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ProductDto, ProductDtoBase } from './dto';
import { isNotDefined, PaginationModel } from '@share';
import { ProductModel } from './models';
import { CartState, DocumentType, Product } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { mapProductsQueryParams } from './mappers';
import { getProductListFilters } from './utils';
import { Document } from '@prisma/client';

@Injectable()
export class ProductService {
    private readonly productCacheKey = 'productsCache';
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async create({ categoryIds, ...dto }: ProductDtoBase) {
        const existProduct = await this.prismaService.product.findFirst({
            where: { name: dto.name },
        });
        if (categoryIds?.length) {
            await this.checkCategories(categoryIds);
        }

        if (existProduct) {
            throw new ConflictException('Товар с таким наименованием уже существует');
        }
        const result = await this.prismaService.product.create({
            data: {
                ...dto,
                minPrice: this.getProductMinPrice(dto),
                categories: {
                    connect: categoryIds?.map((x) => ({ id: x })),
                },
            },
        });

        if (!result) {
            throw new BadRequestException('Непредвиденная ошибка создания товара');
        }

        await this.cacheManager.del(this.productCacheKey);

        return result;
    }

    async update({ categoryIds, id, removeImageIds, ...dto }: ProductDto) {
        try {
            const existProduct = await this.prismaService.product.findFirst({
                where: { AND: [{ name: dto.name }, { id: { not: id } }] },
            });
            if (categoryIds?.length) {
                await this.checkCategories(categoryIds);
            }

            if (existProduct) {
                throw new ConflictException('Товар с таким наименованием уже существует');
            }

            if (!!removeImageIds?.length) {
                await Promise.all(
                    removeImageIds.map((id) =>
                        this.prismaService.document.delete({
                            where: { customId: id },
                        }),
                    ),
                );
            }

            const result = await this.prismaService.product.update({
                where: { id },
                data: {
                    ...dto,
                    minPrice: this.getProductMinPrice(dto),
                    categories: {
                        connect: categoryIds?.map((x) => ({ id: x })),
                    },
                },
                include: { categories: true, documents: true },
            });

            if (!result) {
                throw new BadRequestException('Непредвиденная ошибка обновления товара');
            }

            await this.cacheManager.del(this.productCacheKey);
            await this.cacheManager.del(this.getCashProductKey(id));

            return result;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getProducts(req: Request): Promise<PaginationModel<ProductModel[]>> {
        const { query } = req;
        const queryParams = mapProductsQueryParams(query);

        const needCacheData =
            !queryParams.name &&
            !queryParams.categoryIds &&
            !queryParams.maxPrice &&
            !queryParams.minPrice;

        if (needCacheData) {
            const cacheData = await this.cacheManager.get<PaginationModel<ProductModel[]>>(
                this.productCacheKey,
            );
            if (cacheData) {
                return cacheData;
            }
        }

        const data = await this.prismaService.product
            .findMany({
                where: getProductListFilters(queryParams),
                take: queryParams.page ? queryParams.page * queryParams.pageSize : undefined,
                include: { categories: true, documents: true },
            })
            .then((x) => x.map(this.sortProductImages));

        const count = await this.prismaService.product.count({
            where: getProductListFilters(queryParams),
        });
        const result: PaginationModel<ProductModel[]> = {
            data,
            totalCount: count,
            pageSize: queryParams.pageSize,
            page: queryParams.page,
            lastPage: Math.ceil(count / queryParams.pageSize),
        };

        if (needCacheData) {
            await this.cacheManager.set(this.productCacheKey, result);
        }

        return result;
    }

    async getProduct(productId: string, currentUserId?: string) {
        const cacheProduct = await this.cacheManager.get(
            this.getCashProductKey(productId, currentUserId),
        );
        if (cacheProduct) {
            return cacheProduct;
        }

        const product = await this.prismaService.product
            .findFirst({
                where: { id: productId },
                include: {
                    categories: true,
                    documents: true,
                    cartItems: {
                        where: { cart: { userId: currentUserId, state: CartState.CURRENT } },
                    },
                },
            })
            .then(this.sortProductImages);

        await this.cacheManager.set(this.getCashProductKey(productId, currentUserId), product);

        if (!product) {
            throw new NotFoundException(`Товар с id=${productId} - не найден`);
        }
        return product;
    }

    deleteProduct(id: string) {
        return this.prismaService.product.delete({ where: { id } });
    }

    async updateProductImages(productId: string, files: Express.Multer.File[], uuids: string[]) {
        await this.getProduct(productId);

        const upsertPromises = files.map((file, index) =>
            this.prismaService.document.create({
                data: {
                    documentType: DocumentType.PRODUCT_IMG,
                    value: file.buffer,
                    customId: uuids[index],
                    productId,
                },
            }),
        );

        await Promise.all(upsertPromises);

        await this.cacheManager.del(this.productCacheKey);
        await this.cacheManager.del(this.getCashProductKey(productId));

        return this.getProduct(productId);
    }

    deleteProductCash(id: string, currentUserId?: string) {
        return this.cacheManager.del(this.getCashProductKey(id, currentUserId));
    }

    private async checkCategories(categoryIds: string[]) {
        const existCategories = await this.prismaService.category.findMany({
            where: {
                id: {
                    in: categoryIds,
                },
            },
        });
        if (categoryIds.length !== existCategories.length) {
            throw new BadRequestException('Передана несуществующая категория');
        }
        return;
    }

    private getCashProductKey(id: string, currentUserId?: string) {
        return `${this.productCacheKey}_${id}_${currentUserId}`;
    }

    private sortProductImages(product: Product & { documents: Document[] }) {
        product.documents = product.documents.sort((a) =>
            a.customId === product.avatarCustomId ? -1 : 1,
        );
        return product;
    }

    private getProductMinPrice({ price, discountedPrice }: Partial<ProductDtoBase>) {
        if (isNotDefined(discountedPrice)) {
            return price;
        }
        return price > discountedPrice ? discountedPrice : price;
    }
}
