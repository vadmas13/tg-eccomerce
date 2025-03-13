import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { classValidatorException } from '@share/pipes';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // TODO: добавить логирование

    app.use(cookieParser());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    // TODO: покопаться в настройках базовых https://docs.nestjs.com/techniques/validation
    app.useGlobalPipes(classValidatorException());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.setGlobalPrefix('api');

    app.enableCors({
        //TODO: вынести в .env
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });

    await app.listen(3001);
}
bootstrap();
