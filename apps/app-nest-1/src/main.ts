/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Set if you always want your application to exit without waiting for HTTP requests to end
    // https://docs.nestjs.com/faq/keep-alive-connections
    forceCloseConnections: true,
  });
  app.enableShutdownHooks();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const port = Number(process.env['PORT']) || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port.toString()}/${globalPrefix}`,
  );
}

void bootstrap();
