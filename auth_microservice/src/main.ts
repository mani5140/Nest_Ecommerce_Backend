import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
dotenv.config();


async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  server.setGlobalPrefix('api/v1');
  const port = process.env.PORT || 3008;
  await server.listen(port);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });

  await app.listen();
}
bootstrap();
