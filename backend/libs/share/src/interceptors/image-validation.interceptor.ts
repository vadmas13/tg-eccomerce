import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import * as sharp from 'sharp';
import { UpsertDocumentDto } from '../models';
import { imagesFileTypeRegex, MAX_PICTIRE_SIZE } from '../consts';

@Injectable()
export class ImageValidationInterceptor implements NestInterceptor {
    constructor(private readonly imageKey: string) {}

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const productImageDto = request.body;

        const images: UpsertDocumentDto[] = productImageDto[this.imageKey];

        if (!images) {
            throw new BadRequestException(`Ключ ${this.imageKey} не найден в запросе.`);
        }

        const validationErrors = [];

        for (const image of images) {
            const imageBuffer = image.value;

            // Валидация формата
            const imageType = await sharp(imageBuffer)
                .metadata()
                .then((metadata) => metadata.format);
            if (!imagesFileTypeRegex.test(imageType)) {
                validationErrors.push(`Неподдерживаемый формат изображения для ID ${image.id}`);
            }

            // Валидация размера
            if (imageBuffer.length > MAX_PICTIRE_SIZE) {
                validationErrors.push(`Размер изображения превышает 5 МБ для ID ${image.id}`);
            }

            // // Валидация разрешения
            // const metadata = await sharp(imageBuffer).metadata();
            // if (metadata.width > 1920 || metadata.height > 1080) {
            //     validationErrors.push(
            //         `Изображение слишком большое, максимальное разрешение 1920x1080 для ID ${image.id}`,
            //     );
            // }
        }

        if (validationErrors.length > 0) {
            throw new BadRequestException(validationErrors);
        }

        return next.handle();
    }
}
