import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.WEB_CLIENT_URL,
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
