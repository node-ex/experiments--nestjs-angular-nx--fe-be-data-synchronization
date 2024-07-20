import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SseModule } from './sse/sse.module';
import { RestApiModule } from './rest-api/rest-api.module';

@Module({
  imports: [RestApiModule, SseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
