import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const microservice = app.connectMicroservice({
        transport: Transport.REDIS,
        options: {
            url: process.env.REDIS_URL,
        },
    });

    await app.startAllMicroservicesAsync();
    await app.listen(3000);
}
bootstrap();
