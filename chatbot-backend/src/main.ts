import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS'u etkinleştir
  await app.listen(3001); // Backend portunu 3001 olarak ayarla
}
bootstrap();
