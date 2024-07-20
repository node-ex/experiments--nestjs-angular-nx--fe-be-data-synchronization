import { Module } from '@nestjs/common';
import { RestApiController } from './rest-api.controller';

@Module({
  controllers: [RestApiController],
})
export class RestApiModule {}
