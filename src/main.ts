import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationExceptionFilter } from "./common/filters/validation.exception";
import { ResponseInterceptor } from "./common/interceptor/response.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useGlobalFilters(new ValidationExceptionFilter());

    await app.listen(process.env.APP_PORT);
    console.log("Server is running on port", process.env.APP_PORT);
}
bootstrap();
