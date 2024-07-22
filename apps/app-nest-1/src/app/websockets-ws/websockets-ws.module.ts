import { Module } from '@nestjs/common';
import { WebsocketsWsGateway } from './websockets-ws.gateway';

@Module({
  providers: [WebsocketsWsGateway],
})
export class WebsocketsWsModule {}
