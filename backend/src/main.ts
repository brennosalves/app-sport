import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS with explicit allowed origin
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',  // Optional: specify the allowed methods
    allowedHeaders: 'Content-Type, Accept',  // Optional: specify allowed headers
  });
  await app.listen(process.env.PORT ?? 5010);
}
bootstrap();
